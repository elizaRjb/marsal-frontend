/* eslint-disable no-console */
export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const GET_SUB_TASKS = 'GET_SUB_TASKS';
export const GET_TASKS_LIST = 'GET_TASKS_LIST';
export const SET_TASKS_LIST = 'SET_TASKS_LIST';
export const UPDATE_TASKS_LIST = 'UPDATE_TASKS_LIST';
export const GET_TASK_DETAILS = 'GET_TASK_DETAILS';
export const UPDATE_TASK_DETAILS = 'UPDATE_TASK_DETAILS';
export const REMOVE_TASK_FROM_STORE = 'REMOVE_TASK_FROM_STORE';
export const UPDATE_CHILDREN_TASK_DETAILS = 'UPDATE_CHILDREN_TASK_DETAILS';
export const UPDATE_TASK_DETAILS_IN_STORE = 'UPDATE_TASK_DETAILS_IN_STORE';

export function createTask(projectId, parentTaskId = '', callbackSuccess = null, callbackError = null) {
  return {
    type: CREATE_TASK,
    projectId,
    parentTaskId,
    callbackSuccess,
    callbackError
  };
}

export function deleteTask(projectId, taskId, callbackSuccess = null, callbackError = null) {
  return {
    type: DELETE_TASK,
    projectId,
    taskId,
    callbackSuccess,
    callbackError
  };
}

export function getTasksList(projectId, callbackSuccess = null, callbackError = null) {
  return {
    type: GET_TASKS_LIST,
    projectId,
    callbackSuccess,
    callbackError
  };
}

export function getTaskDetails(projectId, taskId, callbackSuccess = null, callbackError = null) {
  return {
    type: GET_TASK_DETAILS,
    projectId,
    taskId,
    callbackSuccess,
    callbackError
  };
}

export function getSubTasks(projectId, taskId, callbackSuccess = null, callbackError = null) {
  return {
    type: GET_SUB_TASKS,
    projectId,
    taskId,
    callbackSuccess,
    callbackError
  };
}

export function updateTaskDetails(projectId, taskId, data, callbackSuccess = null, callbackError = null) {
  return {
    type: UPDATE_TASK_DETAILS,
    projectId,
    taskId,
    data,
    callbackSuccess,
    callbackError
  };
}

export function setTasksList(projectId, taskList) {
  return {
    type: SET_TASKS_LIST,
    projectId,
    taskList
  };
}

export function updateTasksList(projectId, task) {
  return {
    type: UPDATE_TASKS_LIST,
    projectId,
    task
  };
}

export function updateChildrenTasks(projectId, taskId, childTask) {
  return {
    type: UPDATE_CHILDREN_TASK_DETAILS,
    projectId,
    taskId,
    childTask
  };
}

export function updateTaskDetailsInStore(projectId, taskDetails) {
  return {
    type: UPDATE_TASK_DETAILS_IN_STORE,
    projectId,
    taskDetails
  };
}

export function removeTaskFromStore(projectId, taskId) {
  return {
    type: REMOVE_TASK_FROM_STORE,
    projectId,
    taskId
  };
}
