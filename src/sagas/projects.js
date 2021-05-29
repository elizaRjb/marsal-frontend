/* eslint-disable no-console */
import { takeLatest, call, all, put } from 'redux-saga/effects';

import ProjectsApi from 'api/projects';

import {
  GET_PROJECTS_LIST,
  CREATE_PROJECT,
  ADD_MEMBER_IN_PROJECT,
  setProjectsList,
  updateProjectsList,
  updateMembersList,
} from 'actions/projects';

function* handleGetProjectsListRequest(action) {
  const { callbackSuccess, callbackError } = action;

  try {
    const res = yield call(ProjectsApi.getProjects);

    if (!res) {
      throw new Error('connection error');
    }

    if ('error' in res) {
      throw new Error(res.error);
    }

    yield put(setProjectsList(res.data.data));

    if (callbackSuccess) {
      callbackSuccess();
    }
  } catch (e) {
    const errMsg = `Projects Request Error: ${e.message}`;

    console.error(errMsg);

    if (callbackError) {
      callbackError(e.message);
    }
  }
}

function* watchGetProjectsListRequest() {
  yield takeLatest(GET_PROJECTS_LIST, handleGetProjectsListRequest);
}

function* handleCreateProjectRequest(action) {
  const { data, callbackSuccess, callbackError } = action;

  try {
    const res = yield call(ProjectsApi.createProject, data);

    if (!res) {
      throw new Error('connection error');
    }

    if ('error' in res) {
      throw new Error(res.error);
    }

    const responseData = res.data.data;

    yield put(updateProjectsList(responseData));

    if (callbackSuccess) {
      callbackSuccess(responseData);
    }
  } catch (e) {
    const errMsg = `Create Project Request Error: ${e.message}`;

    console.error(errMsg);

    if (callbackError) {
      callbackError(e.response.data.error);
    }
  }
}

function* watchCreateProjectRequest() {
  yield takeLatest(CREATE_PROJECT, handleCreateProjectRequest);
}

function* handleAddMemberInProjectRequest(action) {
  const { projectId, data, callbackSuccess, callbackError } = action;

  try {
    const res = yield call(ProjectsApi.addMemberInProject, projectId, data);

    if (!res) {
      throw new Error('connection error');
    }

    if ('error' in res) {
      throw new Error(res.error);
    }

    const responseData = res.data.data;

    yield put(updateMembersList(projectId, responseData));

    if (callbackSuccess) {
      callbackSuccess(responseData);
    }
  } catch (e) {
    const errMsg = `Add member in project Request Error: ${e.message}`;

    console.error(errMsg);

    if (callbackError) {
      callbackError(e.response.data.error);
    }
  }
}

function* watchAddMemberInProjectRequest() {
  yield takeLatest(ADD_MEMBER_IN_PROJECT, handleAddMemberInProjectRequest);
}

export default function* projectSaga() {
  yield all([watchGetProjectsListRequest(), watchCreateProjectRequest(), watchAddMemberInProjectRequest()]);
}
