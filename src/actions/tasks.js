export const CREATE_TASK = 'CREATE_TASK';
export const GET_SUB_TASKS = 'GET_SUB_TASKS';
export const GET_TASKS_LIST = 'GET_TASKS_LIST';
export const GET_TASK_DETAILS = 'GET_TASK_DETAILS';

export function createTask(projectId, parentTaskId = '', callbackSuccess = null, callbackError = null) {
  return {
    type: CREATE_TASK,
    projectId,
    parentTaskId,
    callbackSuccess,
    callbackError,
  };
}

export function getTasksList(projectId, callbackSuccess = null, callbackError = null) {
  return {
    type: GET_TASKS_LIST,
    projectId,
    callbackSuccess,
    callbackError,
  };
}

export function getTaskDetails(projectId, taskId, callbackSuccess = null, callbackError = null) {
  return {
    type: GET_TASK_DETAILS,
    projectId,
    taskId,
    callbackSuccess,
    callbackError,
  };
}

export function getSubTasks(projectId, taskId, callbackSuccess = null, callbackError = null) {
  return {
    type: GET_SUB_TASKS,
    projectId,
    taskId,
    callbackSuccess,
    callbackError,
  };
}
