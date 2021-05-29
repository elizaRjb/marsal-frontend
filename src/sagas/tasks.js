/* eslint-disable no-console */
import { takeLatest, call, all, put } from 'redux-saga/effects';

import TasksApi from 'api/tasks';

import {
  GET_TASKS_LIST,
  CREATE_TASK,
  GET_TASK_DETAILS,
  GET_SUB_TASKS,
  UPDATE_TASK_DETAILS,
  DELETE_TASK,
  setTasksList,
  updateTasksList,
  removeTaskFromStore,
  updateTaskDetailsInStore,
} from 'actions/tasks';

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

    yield put(setTasksList(projectId, res.data.data));

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
  const { projectId, taskId, callbackSuccess, callbackError } = action;

  try {
    const res = yield call(TasksApi.getSubTasks, projectId, taskId);

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

/* Update task details */
function* handleUpdateTaskDetailsRequest(action) {
  const { projectId, taskId, data, callbackSuccess, callbackError } = action;

  try {
    const res = yield call(TasksApi.updateTaskDetails, projectId, taskId, data);

    if (!res) {
      throw new Error('connection error');
    }

    if ('error' in res) {
      throw new Error(res.error);
    }

    yield put(updateTaskDetailsInStore(projectId, res.data.data));

    if (callbackSuccess) {
      callbackSuccess(res.data.data);
    }
  } catch (e) {
    const errMsg = `Update Task Details Request Error: ${e.message}`;

    console.error(errMsg);

    if (callbackError) {
      callbackError(e.message);
    }
  }
}

function* watchUpdateTaskDetailsRequest() {
  yield takeLatest(UPDATE_TASK_DETAILS, handleUpdateTaskDetailsRequest);
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

    yield put(updateTasksList(projectId, res.data.data));

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

/* Delete task */
function* handleDeleteTaskRequest(action) {
  const { projectId, taskId, callbackSuccess, callbackError } = action;

  try {
    const res = yield call(TasksApi.deleteTask, projectId, { taskId });

    if (!res) {
      throw new Error('connection error');
    }

    if ('error' in res) {
      throw new Error(res.error);
    }

    yield put(removeTaskFromStore(projectId, taskId));

    if (callbackSuccess) {
      callbackSuccess();
    }
  } catch (e) {
    const errMsg = `Delete Task Request Error: ${e.message}`;

    console.error(errMsg);

    if (callbackError) {
      callbackError(e.message);
    }
  }
}

function* watchDeleteTaskRequest() {
  yield takeLatest(DELETE_TASK, handleDeleteTaskRequest);
}

export default function* taskSaga() {
  yield all([
    watchGetTasksListRequest(),
    watchCreateTaskRequest(),
    watchGetTaskDetailsRequest(),
    watchSubTasksRequest(),
    watchUpdateTaskDetailsRequest(),
    watchDeleteTaskRequest(),
  ]);
}
