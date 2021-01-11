/* eslint-disable no-console */
import { takeLatest, call, all } from 'redux-saga/effects';

import TasksApi from 'api/tasks';

import { GET_TASKS_LIST, CREATE_TASK, GET_TASK_DETAILS, GET_SUB_TASKS } from 'actions/tasks';

/* Get tasks list */
function* handleGetTasksListRequest(action) {
  const { projectId, callbackSuccess, callbackError } = action;

  try {
    const res = yield call(TasksApi.getTasks, projectId);

    if (!res) {
      throw new Error('connection error');
    }

    if ('error' in res) {
      throw new Error(res.error);
    }

    if (callbackSuccess) {
      callbackSuccess(res.data.data);
    }
  } catch (e) {
    const errMsg = `Tasks Request Error: ${e.message}`;

    console.error(errMsg);

    if (callbackError) {
      callbackError(e.message);
    }
  }
}

function* watchGetTasksListRequest() {
  yield takeLatest(GET_TASKS_LIST, handleGetTasksListRequest);
}

/* Get sub tasks */
function* handleSubTasksRequest(action) {
  const { projectId, callbackSuccess, callbackError } = action;

  try {
    const res = yield call(TasksApi.getSubTasks, projectId);

    if (!res) {
      throw new Error('connection error');
    }

    if ('error' in res) {
      throw new Error(res.error);
    }

    if (callbackSuccess) {
      callbackSuccess(res.data.data);
    }
  } catch (e) {
    const errMsg = `Sub Tasks Request Error: ${e.message}`;

    console.error(errMsg);

    if (callbackError) {
      callbackError(e.message);
    }
  }
}

function* watchSubTasksRequest() {
  yield takeLatest(GET_SUB_TASKS, handleSubTasksRequest);
}

/* Get task details */
function* handleGetTaskDetailsRequest(action) {
  const { projectId, taskId, callbackSuccess, callbackError } = action;

  try {
    const res = yield call(TasksApi.getTaskDetails, projectId, taskId);

    if (!res) {
      throw new Error('connection error');
    }

    if ('error' in res) {
      throw new Error(res.error);
    }

    if (callbackSuccess) {
      callbackSuccess(res.data.data);
    }
  } catch (e) {
    const errMsg = `Task Details Request Error: ${e.message}`;

    console.error(errMsg);

    if (callbackError) {
      callbackError(e.message);
    }
  }
}

function* watchGetTaskDetailsRequest() {
  yield takeLatest(GET_TASK_DETAILS, handleGetTaskDetailsRequest);
}

/* Create task */
function* handleCreateTaskRequest(action) {
  const { projectId, parentTaskId, callbackSuccess, callbackError } = action;

  try {
    const res = yield call(TasksApi.createTask, projectId, { parentTaskId });

    if (!res) {
      throw new Error('connection error');
    }

    if ('error' in res) {
      throw new Error(res.error);
    }

    if (callbackSuccess) {
      callbackSuccess(res.data.data);
    }
  } catch (e) {
    const errMsg = `Create Task Request Error: ${e.message}`;

    console.error(errMsg);

    if (callbackError) {
      callbackError(e.message);
    }
  }
}

function* watchCreateTaskRequest() {
  yield takeLatest(CREATE_TASK, handleCreateTaskRequest);
}

export default function* taskSaga() {
  yield all([
    watchGetTasksListRequest(),
    watchCreateTaskRequest(),
    watchGetTaskDetailsRequest(),
    watchSubTasksRequest(),
  ]);
}
