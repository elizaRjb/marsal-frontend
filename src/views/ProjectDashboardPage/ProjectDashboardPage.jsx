/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

import { PLUS_ICON_BLUE } from 'utils/images';

import { getProjectsList } from 'selectors/projects';

import { getTasksList, createTask } from 'actions/tasks';

import Button from 'components/Button/Button';

import TaskList from 'views/TaskList/TaskList';

import ProjectDashboardEmptyState from './components/ProjectDashboardEmptyState';

class ProjectDashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      tasksList: [],
      error: '',
      taskDetailsOpen: false,
      taskLoading: false,
      taskDetails: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { projectId },
      },
      getTasksList,
    } = this.props;

    const tasksList = this.getTasks(projectId);

    if (!tasksList.length) {
      this.setState({ isLoading: true });

      const callbackSuccess = data => {
        this.setState({ isLoading: false, tasksList: data });
      };

      const callbackError = error => {
        this.setState({ isLoading: false, error });
      };

      getTasksList(projectId, callbackSuccess, callbackError);
    }

    this.setState({ tasksList });
  }

  componentDidUpdate(nextProps) {
    const {
      match: {
        params: { projectId },
      },
    } = this.props;

    if (nextProps.projects !== this.props.projects) {
      this.setState({ tasksList: this.getTasks(projectId) });
    }
  }

  getTasks = projectId => {
    const { projects } = this.props;

    const project = projects.find(project => {
      // eslint-disable-next-line eqeqeq
      return project._id == projectId;
    });

    if (project.tasks && project.tasks.length) {
      return project.tasks;
    }

    return [];
  };

  handleCreateTask = () => {
    const { tasksList } = this.state;
    const {
      createTask,
      history,
      match: {
        params: { projectId },
      },
    } = this.props;

    this.setState({ taskLoading: true });

    const callbackSuccess = task => {
      this.setState({ tasksList, taskLoading: false });
      toast.success('Task created successfully!');

      history.push(`/project/${projectId}/t/${task._id}`);
    };

    const callbackError = error => {
      this.setState({ taskLoading: false, error });
    };

    createTask(projectId, '', callbackSuccess, callbackError);
  };

  getInProgressTasks = () => {
    const { tasksList } = this.state;

    if (!tasksList.length) {
      return [];
    }

    const inProgressTasks = tasksList.filter(task => {
      return task.stage !== 'Backlog' && task.stage !== 'Done' && task.parentTaskId === '';
    });

    return inProgressTasks;
  };

  getBacklogTasks = () => {
    const { tasksList } = this.state;

    if (!tasksList.length) {
      return [];
    }

    const backlogTasks = tasksList.filter(task => {
      return task.stage === 'Backlog' && task.parentTaskId === '';
    });

    return backlogTasks;
  };

  render() {
    const { isLoading, taskLoading } = this.state;
    const {
      taskOpen,
      match: {
        params: { projectId },
      },
    } = this.props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    const inProgressTasks = this.getInProgressTasks();
    const backlogTasks = this.getBacklogTasks();

    const leftSectionClassName = taskOpen
      ? 'project-dashboard__left-section project-dashboard__left-section--open'
      : 'project-dashboard__left-section';

    return (
      <div className={leftSectionClassName}>
        <div className="project-dashboard__block">
          <div className="project-dashboard__block-header">
            <h2 className="project-dashboard__block-title">In progress</h2>
            <span className="project-dashboard__block-sub-heading">{inProgressTasks.length} tasks</span>
          </div>
          {inProgressTasks.length ? (
            <TaskList tasks={inProgressTasks} projectId={projectId} />
          ) : (
            <ProjectDashboardEmptyState text="There are no tasks on the board." />
          )}
        </div>
        <div className="project-dashboard__block">
          <div className="project-dashboard__block-header">
            <h2 className="project-dashboard__block-title">Backlog</h2>
            <span className="project-dashboard__block-sub-heading">{backlogTasks.length} tasks</span>
          </div>
          {backlogTasks.length ? (
            <TaskList tasks={backlogTasks} projectId={projectId} />
          ) : (
            <ProjectDashboardEmptyState text="There are no tasks in backlog." />
          )}
          <Button
            type="button"
            className="project-dashboard__block-button"
            onClick={this.handleCreateTask}
            disabled={taskLoading}
          >
            <img src={PLUS_ICON_BLUE} alt="Add" />
            <span>Create task</span>
            {taskLoading && <span className="loading-icon project-dashboard__loading-icon" />}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: getProjectsList(state),
});

const mapDispatchToProps = dispatch => ({
  getTasksList: (projectId, callbackSuccess, callbackError) =>
    dispatch(getTasksList(projectId, callbackSuccess, callbackError)),
  createTask: (projectId, parentTaskId, callbackSuccess, callbackError) =>
    dispatch(createTask(projectId, parentTaskId, callbackSuccess, callbackError)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDashboardPage));
