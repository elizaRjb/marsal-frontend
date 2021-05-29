export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GET_PROJECTS_LIST = 'GET_PROJECTS_LIST';
export const SET_PROJECTS_LIST = 'SET_PROJECTS_LIST';
export const UPDATE_PROJECTS_LIST = 'UPDATE_PROJECTS_LIST';
export const ADD_MEMBER_IN_PROJECT = 'ADD_MEMBER_IN_PROJECT';
export const UPDATE_MEMBERS_LIST_OF_PROJECT = 'UPDATE_MEMBERS_LIST_OF_PROJECT';

export function getProjectsListRequest(callbackSuccess = null, callbackError = null) {
  return {
    type: GET_PROJECTS_LIST,
    callbackSuccess,
    callbackError
  };
}

export function setProjectsList(projects) {
  return {
    type: SET_PROJECTS_LIST,
    projects
  };
}

export function createProject(data, callbackSuccess = null, callbackError = null) {
  return {
    type: CREATE_PROJECT,
    data,
    callbackSuccess,
    callbackError
  };
}

export function updateProjectsList(project) {
  return {
    type: UPDATE_PROJECTS_LIST,
    project
  };
}

export function addMemberInProject(projectId, data, callbackSuccess = null, callbackError = null) {
  return {
    type: ADD_MEMBER_IN_PROJECT,
    projectId,
    data,
    callbackSuccess,
    callbackError
  };
}

export function updateMembersList(projectId, member) {
  return {
    type: UPDATE_MEMBERS_LIST_OF_PROJECT,
    projectId,
    member
  };
}
