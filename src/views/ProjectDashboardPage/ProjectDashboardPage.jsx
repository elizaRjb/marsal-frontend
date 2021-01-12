/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { PLUS_ICON_BLUE } from 'utils/images';

import { getTasksList, createTask } from 'actions/tasks';

import Button from 'components/Button/Button';

import TaskList from 'views/TaskList/TaskList';

import ProjectDashboardEmptyState from './components/ProjectDashboardEmptyState';

class ProjectDashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
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

    const callbackSuccess = data => {
      this.setState({ isLoading: false, tasksList: data });
    };

    const callbackError = error => {
      this.setState({ isLoading: false, error });
    };

    getTasksList(projectId, callbackSuccess, callbackError);
  }

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
      tasksList.push(task);
      this.setState({ tasksList, taskLoading: false });

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

  onTaskClick = task => {
    const {
      history,
      match: {
        params: { projectId },
      },
    } = this.props;

    history.push(`/project/${projectId}/t/${task._id}`);
  };

  render() {
    const { isLoading } = this.state;
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
            <TaskList tasks={inProgressTasks} handleClick={this.onTaskClick} projectId={projectId} />
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
            <TaskList tasks={backlogTasks} handleClick={this.onTaskClick} projectId={projectId} />
          ) : (
            <ProjectDashboardEmptyState text="There are no tasks in backlog." />
          )}
          <Button type="button" className="project-dashboard__block-button" onClick={this.handleCreateTask}>
            <img src={PLUS_ICON_BLUE} alt="Add" />
            <span>Create task</span>
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTasksList: (projectId, callbackSuccess, callbackError) =>
    dispatch(getTasksList(projectId, callbackSuccess, callbackError)),
  createTask: (projectId, parentTaskId, callbackSuccess, callbackError) =>
    dispatch(createTask(projectId, parentTaskId, callbackSuccess, callbackError)),
});

export default withRouter(connect(null, mapDispatchToProps)(ProjectDashboardPage));
