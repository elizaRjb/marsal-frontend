/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { PLUS_ICON_BLUE, CHECKBOX_ICON_BLUE } from 'utils/images';

import { getTaskDetails, getSubTasks, createTask, updateTaskDetails } from 'actions/tasks';

import { getMembersListInProject } from 'services/projectService';

import Button from 'components/Button/Button';
import UserDropdown from 'components/UserDropdown/UserDropdown';
import StagesDropdown from 'components/StagesDropdown/StagesDropdown';
import PriorityDropdown from 'components/PriorityDropdown/PriorityDropdown';
import DateInputDropdown from 'components/DateInputDropdown/DateInputDropdown';

import TaskInput from './components/TaskInput';

import TaskList from 'views/TaskList/TaskList';

class TaskDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskDetails: {
        name: '',
        dueDate: null,
        stage: '',
        priority: '',
        assignedTo: {},
        description: '',
      },
      initialData: {
        name: '',
        dueDate: null,
        stage: '',
        priority: '',
        assignedTo: {},
        description: '',
      },
      isLoading: true,
      isEditing: false,
      projectId: '',
      subTasks: [],
      usersList: [],
      isFormSubmitting: false,
    };
  }

  componentDidMount() {
    const { taskDetails, initialData } = this.state;
    const {
      getTaskDetails,
      getSubTasks,
      match: {
        params: { projectId, taskId },
      },
    } = this.props;

    const usersList = getMembersListInProject(projectId);

    this.setState({ usersList });

    const callbackSuccess = data => {
      const taskDetailsData = { ...taskDetails, ...data };
      const initialTaskData = { ...initialData, ...data };

      if (data.assignedTo && data.assignedTo.userId) {
        const assignedUserDetails = this.getSelectedUser(data.assignedTo.userId);

        taskDetailsData.assignedTo = { ...taskDetailsData.assignedTo, ...assignedUserDetails };
        initialTaskData.assignedTo = { ...initialTaskData.assignedTo, ...assignedUserDetails };
      }

      this.setState({
        isLoading: false,
        taskDetails: taskDetailsData,
        initialData: initialTaskData,
        projectId,
      });

      if (data.childrenTasks.length) {
        getSubTasks(projectId, taskId, data => this.setState({ subTasks: data }));
      }
    };

    const callbackError = error => {
      this.setState({ error });
    };

    getTaskDetails(projectId, taskId, callbackSuccess, callbackError);
  }

  handleInputChange = event => {
    const { taskDetails } = this.state;
    const { name, value } = event.target;

    taskDetails[name] = value;

    this.setState({ taskDetails });

    this.checkIsFormEdited();
  };

  handleAddSubTask = () => {
    const { taskDetails, projectId } = this.state;
    const { createSubTask, history } = this.props;

    this.setState({ taskLoading: true });

    const callbackSuccess = task => {
      history.push(`project/${projectId}/${task._id}`);
      window.location.reload();
    };

    const callbackError = error => {
      this.setState({ taskLoading: false, error });
    };

    createSubTask(projectId, taskDetails._id, callbackSuccess, callbackError);
  };

  getParentTaskLink = () => {
    const { projectId } = this.props;
    const {
      taskDetails: { taskTag, parentTaskId },
    } = this.state;

    const taskTagArr = taskTag.split('-');

    return (
      <span>
        <Link to={`/project/${projectId}/${parentTaskId}`} className="task-details__header-link">
          <img src={CHECKBOX_ICON_BLUE} alt="Task" aria-hidden={true} />
          <span>{taskTagArr[0] + '-' + parentTaskId}</span>
        </Link>
        &nbsp;/&nbsp;
      </span>
    );
  };

  onTaskClick = task => {
    const {
      match: {
        params: { projectId },
      },
    } = this.props;

    this.context.history.push(`/project/${projectId}/${task._id}`);
    // window.location.reload();
  };

  handleCancel = () => {
    this.setState({ isEditing: false, taskDetails: this.state.initialData });
  };

  onDropdownChange = (name, value) => {
    const { taskDetails } = this.state;

    taskDetails[name] = value;

    this.setState({ taskDetails });

    this.checkIsFormEdited();
  };

  handleDateChange = dateValue => {
    const { taskDetails } = this.state;

    taskDetails.dueDate = dateValue;

    this.setState({ taskDetails });

    this.checkIsFormEdited();
  };

  handleAssignedUserChange = user => {
    const { taskDetails } = this.state;

    taskDetails.assignedTo = { ...taskDetails.assignedTo, ...user };

    this.setState({ taskDetails });

    this.checkIsFormEdited();
  };

  checkIsFormEdited = () => {
    const { taskDetails, initialData, isEditing } = this.state;

    if (
      taskDetails.name !== initialData.name ||
      taskDetails.description !== initialData.description ||
      taskDetails.dueDate !== initialData.dueDate ||
      taskDetails.stage !== initialData.stage ||
      taskDetails.priority !== initialData.priority ||
      (Object.keys(taskDetails.assignedTo).length &&
        Object.keys(initialData.assignedTo).length &&
        taskDetails.assignedTo.userId !== initialData.assignedTo.userId)
    ) {
      if (!isEditing) {
        this.setState({ isEditing: true });
      }
    } else {
      this.setState({ isEditing: false });
    }
  };

  handleSubmit = event => {
    const { taskDetails } = this.state;
    const {
      updateTaskDetails,
      match: {
        params: { projectId, taskId },
      },
    } = this.props;

    event.preventDefault();

    let assignedUser = {};

    if (Object.keys(taskDetails.assignedTo).length) {
      assignedUser = {
        name: taskDetails.assignedTo.name,
        email: taskDetails.assignedTo.email,
        userId: taskDetails.assignedTo.userId,
      };
    }

    const data = {
      name: taskDetails.name,
      assignedTo: assignedUser,
      dueDate: taskDetails.dueDate,
      stage: taskDetails.stage,
      priority: taskDetails.priority,
      description: taskDetails.description,
    };

    this.setState({ isFormSubmitting: true });

    const callbackSuccess = data => {
      this.setState({ isFormSubmitting: false, taskDetails: { ...data }, initialData: { ...data } });
    };

    const callbackError = error => {
      this.setState({ isFormSubmitting: false, error });
    };

    updateTaskDetails(projectId, taskId, data, callbackSuccess, callbackError);
  };

  getSelectedUser = selectedUserId => {
    const { usersList } = this.state;

    return usersList.find(item => {
      return item.userId === selectedUserId;
    });
  };

  render() {
    const { taskDetails, isFormSubmitting, isEditing, subTasks, usersList } = this.state;
    const {
      onClose,
      match: {
        params: { projectId },
      },
    } = this.props;

    const assignedUser =
      taskDetails && taskDetails.assignedTo.userId ? this.getSelectedUser(taskDetails.assignedTo.userId) : {};

    const parentTaskTag = taskDetails.parentTaskId ? this.getParentTaskLink() : null;

    const subTasksList = subTasks.length ? (
      <div className="task-details__section">
        <div className="task-details__section-title">Subtasks</div>
        <TaskList tasks={subTasks} handleClick={this.onTaskClick} />
      </div>
    ) : null;

    return (
      <div className="task-details">
        <div className="task-details__header">
          {parentTaskTag}
          <Link to={`/project/${projectId}/${taskDetails._id}`} className="task-details__header-link">
            <img src={CHECKBOX_ICON_BLUE} alt="Task" aria-hidden={true} />
            <span>{taskDetails.taskTag}</span>
          </Link>
          <div className="task-details__header-btn-group">
            <Button className="task-details__header-btn task-details__header-btn--more" title="More" />
            <Link
              to={`/project/${projectId}`}
              className="task-details__header-btn task-details__header-btn--close"
              onClick={onClose}
              title="Close"
            />
          </div>
        </div>
        <div className="task-details__body">
          <form onSubmit={this.handleSubmit}>
            <div className="task-details__row">
              <TaskInput
                name="name"
                className="task-details__input--lg"
                value={taskDetails.name}
                onChange={this.handleInputChange}
                placeholder="Write a task name"
              />
            </div>
            <div className="task-details__form-group">
              <div className="task-details__form-label">Assigned to:</div>
              <div className="task-details__form-values">
                <UserDropdown
                  usersList={usersList}
                  selectedUser={assignedUser}
                  onDropdownItemClick={this.handleAssignedUserChange}
                />
              </div>
            </div>
            <div className="task-details__form-group">
              <div className="task-details__form-label">Due Date:</div>
              <div className="task-details__form-values">
                <DateInputDropdown dateValue={taskDetails.dueDate} onDateChange={this.handleDateChange} />
              </div>
            </div>
            <div className="task-details__form-group">
              <div className="task-details__form-label">Stages:</div>
              <div className="task-details__form-values">
                <StagesDropdown value={taskDetails.stage} onDropdownItemClick={this.onDropdownChange} />
              </div>
            </div>
            <div className="task-details__form-group">
              <div className="task-details__form-label">Priority:</div>
              <div className="task-details__form-values">
                <PriorityDropdown value={taskDetails.priority} onDropdownItemClick={this.onDropdownChange} />
              </div>
            </div>
            <div className="task-details__form-group task-details__form-group--top-align">
              <div className="task-details__form-label">Description:</div>
              <div className="task-details__form-values">
                <TaskInput
                  name="description"
                  rows={5}
                  className="task-details__input--long"
                  value={taskDetails.description}
                  onChange={this.handleInputChange}
                  placeholder="Add more details to the task here..."
                />
              </div>
            </div>
            {isEditing && (
              <div className="task-details__body-btn-group">
                <Button
                  type="button"
                  style="ghost"
                  className="task-details__form-btn"
                  disabled={isFormSubmitting}
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
                <Button type="submit" style="primary" className="task-details__form-btn" disabled={isFormSubmitting}>
                  {isFormSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </div>
            )}
          </form>
        </div>
        {subTasksList}
        <Button type="button" className="task-details__block-button" onClick={this.handleAddSubTask}>
          <img src={PLUS_ICON_BLUE} alt="Add" />
          <span>Add subtask</span>
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTaskDetails: (projectId, taskId, callbackSuccess, callbackError) =>
    dispatch(getTaskDetails(projectId, taskId, callbackSuccess, callbackError)),
  getSubTasks: (projectId, taskId, callbackSuccess, callbackError) =>
    dispatch(getSubTasks(projectId, taskId, callbackSuccess, callbackError)),
  createSubTask: (projectId, parentTaskId, callbackSuccess, callbackError) =>
    dispatch(createTask(projectId, parentTaskId, callbackSuccess, callbackError)),
  updateTaskDetails: (projectId, parentTaskId, data, callbackSuccess, callbackError) =>
    dispatch(updateTaskDetails(projectId, parentTaskId, data, callbackSuccess, callbackError)),
});

const ReduxTaskDetailsPage = connect(null, mapDispatchToProps)(TaskDetailsPage);

export default withRouter(ReduxTaskDetailsPage);
