/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PLUS_ICON_BLUE } from 'utils/images';

import { getTaskDetails, getSubTasks } from 'actions/tasks';

import { getMembersListInProject } from 'services/projectService';

import Button from 'components/Button/Button';
import UserDropdown from 'components/UserDropdown/UserDropdown';
import StagesDropdown from 'components/StagesDropdown/StagesDropdown';

import TaskInput from './components/TaskInput';
import PriorityDropdown from 'components/PriorityDropdown/PriorityDropdown';
import DateInputDropdown from 'components/DateInputDropdown/DateInputDropdown';

class TaskDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskDetails: {},
      initialData: {},
      subTasks: [],
      isLoading: true,
      isEditing: false,
      isFormSubmitting: false,
    };
  }

  componentDidMount() {
    const {
      getTaskDetails,
      getSubTasks,
      match: {
        params: { projectId, taskId },
      },
    } = this.props;

    const callbackSuccess = data => {
      this.setState({ isLoading: false, taskDetails: data, initialData: { ...data } });

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
    const { taskDetails, initialData } = this.state;
    const { name, value } = event.target;

    taskDetails[name] = value;

    this.setState({ taskDetails, isEditing: initialData[name] !== value ? true : false });
  };

  handleAddSubTask = () => {
    const { taskDetails, subTasks } = this.state;
    const { createSubTask, projectId } = this.props;

    this.setState({ taskLoading: true });

    const callbackSuccess = task => {
      subTasks.push(task);
      this.setState({ taskDetails: task, subTasks, taskLoading: false });
    };

    const callbackError = error => {
      this.setState({ taskLoading: false, error });
    };

    createSubTask(projectId, taskDetails._id, callbackSuccess, callbackError);
  };

  render() {
    const { taskDetails, isFormSubmitting, isEditing } = this.state;

    const { onClose, projectId } = this.props;

    const usersList = getMembersListInProject(projectId);

    return (
      <div className="task-details">
        <div className="task-details__header">
          <div className="task-details__header-btn-group">
            <Button className="task-details__header-btn task-details__header-btn--more" title="More" />
            <Button
              className="task-details__header-btn task-details__header-btn--close"
              onClick={onClose}
              title="Close"
            />
          </div>
        </div>
        <div className="task-details__body">
          <form>
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
                <UserDropdown usersList={usersList} />
              </div>
            </div>
            <div className="task-details__form-group">
              <div className="task-details__form-label">Due Date:</div>
              <div className="task-details__form-values">
                <DateInputDropdown />
              </div>
            </div>
            <div className="task-details__form-group">
              <div className="task-details__form-label">Stages:</div>
              <div className="task-details__form-values">
                <StagesDropdown value="Backlog" />
              </div>
            </div>
            <div className="task-details__form-group">
              <div className="task-details__form-label">Priority:</div>
              <div className="task-details__form-values">
                <PriorityDropdown value="Minor" />
              </div>
            </div>
            <div className="task-details__form-group task-details__form-group--top-align">
              <div className="task-details__form-label">Description:</div>
              <div className="task-details__form-values">
                <TaskInput
                  name="description"
                  className="task-details__input--long"
                  value={taskDetails.description}
                  onChange={this.handleInputChange}
                  placeholder="Add more details to the task here..."
                />
              </div>
            </div>
            {isEditing && (
              <div className="task-details__body-btn-group">
                <Button type="button" style="ghost" className="task-details__form-btn" disabled={isFormSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" style="primary" className="task-details__form-btn" disabled={isFormSubmitting}>
                  {isFormSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </div>
            )}
          </form>
        </div>

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
});

export default connect(null, mapDispatchToProps)(TaskDetailsPage);
