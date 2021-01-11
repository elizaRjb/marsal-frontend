export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GET_PROJECTS_LIST = 'GET_PROJECTS_LIST';
export const SET_PROJECTS_LIST = 'SET_PROJECTS_LIST';
export const UPDATE_PROJECTS_LIST = 'UPDATE_PROJECTS_LIST';

export function getProjectsListRequest(callbackSuccess = null, callbackError = null) {
  return {
    type: GET_PROJECTS_LIST,
    callbackSuccess,
    callbackError,
  };
}

export function setProjectsList(projects) {
  return {
    type: SET_PROJECTS_LIST,
    projects,
  };
}

export function createProject(data, callbackSuccess = null, callbackError = null) {
  return {
    type: CREATE_PROJECT,
    data,
    callbackSuccess,
    callbackError,
  };
}

export function updateProjectsList(project) {
  return {
    type: UPDATE_PROJECTS_LIST,
    project,
  };
}
