/* eslint-disable no-console */
/* eslint-disable eqeqeq */
import { SET_PROJECTS_LIST, UPDATE_PROJECTS_LIST, UPDATE_MEMBERS_LIST_OF_PROJECT } from 'actions/projects';
import {
  SET_TASKS_LIST,
  UPDATE_TASKS_LIST,
  REMOVE_TASK_FROM_STORE,
  UPDATE_CHILDREN_TASK_DETAILS,
  UPDATE_TASK_DETAILS_IN_STORE,
} from 'actions/tasks';

const INITIAL_STATE = null;

export default function projects(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PROJECTS_LIST: {
      const { projects } = action;

      return { ...state, projects };
    }
    case UPDATE_PROJECTS_LIST: {
      const { project } = action;
      const { projects } = state;

      projects.push(project);

      return { ...state, projects };
    }
    case SET_TASKS_LIST: {
      const { projectId, taskList } = action;
      const { projects } = state;

      const projectIndex = projects.findIndex(project => {
        return project._id === projectId;
      });

      projects[projectIndex].tasks = taskList;

      return { ...state, projects };
    }
    case UPDATE_TASKS_LIST: {
      const { projectId, task } = action;
      const { projects } = state;

      const projectIndex = projects.findIndex(project => {
        return project._id == projectId;
      });

      projects[projectIndex].tasks.push(task);

      return { ...state, projects };
    }
    case UPDATE_CHILDREN_TASK_DETAILS: {
      const { projectId, taskId, childTask } = action;
      const { projects } = state;

      const projectIndex = projects.findIndex(project => {
        return project._id == projectId;
      });

      const taskIndex = projects[projectIndex].tasks.findIndex(task => {
        return task._id == taskId;
      });

      projects[projectIndex].tasks[taskIndex].childrenTasks.push({ taskId: childTask._id, tasktag: childTask.taskTag });

      return { ...state, projects };
    }
    case UPDATE_TASK_DETAILS_IN_STORE: {
      const { projectId, taskDetails } = action;
      const { projects } = state;

      const projectIndex = projects.findIndex(project => {
        return project._id == projectId;
      });

      const taskIndex = projects[projectIndex].tasks.findIndex(task => {
        return task._id.toString() === taskDetails._id.toString();
      });

      projects[projectIndex].tasks[taskIndex] = taskDetails;

      return { ...state, projects };
    }
    case REMOVE_TASK_FROM_STORE: {
      const { projectId, taskId } = action;
      const { projects } = state;

      const projectIndex = projects.findIndex(project => {
        return project._id == projectId;
      });

      const tasksList = projects[projectIndex].tasks;

      const newTasks = tasksList.filter(task => {
        if (task._id.toString() === taskId.toString() || task.parentTaskId.toString() === taskId.toString()) {
          return false;
        }

        return true;
      });

      projects[projectIndex].tasks = newTasks;

      return { ...state, projects };
    }
    case UPDATE_MEMBERS_LIST_OF_PROJECT: {
      const { projectId, member } = action;
      const { projects } = state;

      const projectIndex = projects.findIndex(project => {
        return project._id.toString() === projectId.toString();
      });

      projects[projectIndex].members.push(member);

      return { ...state, projects };
    }
    default:
      return state;
  }
}
