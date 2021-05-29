/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import { getTasksList, updateTaskDetails } from 'actions/tasks';

import { getProjectsList } from 'selectors/projects';

import Column from './components/Column';
import { toast } from 'react-toastify';

const TASK_STAGES = {
  backlog: 'Backlog',
  inProgress: 'In Progress',
  inReview: 'In Review',
  inQA: 'In QA',
  done: 'Done'
};

class ProjectBoardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      boardData: {},
      isLoading: true
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { projectId }
      },
      getTasksList
    } = this.props;

    const callbackSuccess = data => {
      this.setState({ tasks: data });

      this.setBoardData();
    };

    const callbackError = error => {
      this.setState({ isLoading: false, error });
    };

    getTasksList(projectId, callbackSuccess, callbackError);
  }

  setBoardData = () => {
    const { tasks } = this.state;

    const tasksList = tasks.map(task => {
      return { [task._id]: { ...task } };
    });

    const backlogTaskIds = this.getTaskIdsOfGroup(TASK_STAGES.backlog, tasks);
    const inProgressTaskIds = this.getTaskIdsOfGroup(TASK_STAGES.inProgress, tasks);
    const inReviewTaskIds = this.getTaskIdsOfGroup(TASK_STAGES.inReview, tasks);
    const inQATaskIds = this.getTaskIdsOfGroup(TASK_STAGES.inQA, tasks);
    const doneTaskIds = this.getTaskIdsOfGroup(TASK_STAGES.done, tasks);

    const boardData = {
      tasks: Object.assign({}, ...tasksList),
      columns: {
        backlog: {
          id: 'backlog',
          title: TASK_STAGES.backlog,
          taskIds: backlogTaskIds
        },
        inProgress: {
          id: 'inProgress',
          title: TASK_STAGES.inProgress,
          taskIds: inProgressTaskIds
        },
        inReview: {
          id: 'inReview',
          title: TASK_STAGES.inReview,
          taskIds: inReviewTaskIds
        },
        inQA: {
          id: 'inQA',
          title: TASK_STAGES.inQA,
          taskIds: inQATaskIds
        },
        done: {
          id: 'done',
          title: TASK_STAGES.done,
          taskIds: doneTaskIds
        }
      },
      columnOrder: ['backlog', 'inProgress', 'inReview', 'inQA', 'done']
    };

    this.setState({ boardData, isLoading: false });
  };

  getTaskIdsOfGroup = (type, tasks) => {
    if (!tasks.length) {
      return [];
    }

    const group = tasks.filter(task => {
      return task.stage === type;
    });

    return group.map(item => {
      return item._id;
    });
  };

  handleDragEnd = result => {
    const {
      updateTaskDetails,
      match: {
        params: { projectId }
      }
    } = this.props;
    const { boardData } = this.state;
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = boardData.columns[source.droppableId];
    const finish = boardData.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newData = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState({ boardData: newData });
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);

    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);

    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = { ...finish, taskIds: finishTaskIds };

    const newData = {
      ...boardData,
      columns: {
        ...boardData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    this.setState({ boardData: newData });

    const data = {
      stage: TASK_STAGES[destination.droppableId]
    };

    const callbackSuccess = () => {
      toast.success('Task updated successfully!');
    };

    updateTaskDetails(projectId, draggableId, data, callbackSuccess);
  };

  render() {
    const { boardData, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="project-board">
        <DragDropContext
          // onDragStart={}
          // onDragUpdate={}
          onDragEnd={this.handleDragEnd}
        >
          {boardData.columnOrder.map(columnId => {
            const column = boardData.columns[columnId];

            const tasks = column.taskIds.map(taskId => {
              return boardData.tasks[taskId.toString()];
            });

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </DragDropContext>
      </div>
    );

    // return <div>hello</div>;
  }
}

const mapStateToProps = state => ({
  projects: getProjectsList(state)
});

const mapDispatchToProps = dispatch => ({
  getTasksList: (projectId, callbackSuccess, callbackError) =>
    dispatch(getTasksList(projectId, callbackSuccess, callbackError)),
  updateTaskDetails: (projectId, parentTaskId, data, callbackSuccess, callbackError) =>
    dispatch(updateTaskDetails(projectId, parentTaskId, data, callbackSuccess, callbackError))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectBoardPage));
