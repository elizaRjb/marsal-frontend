/* eslint-disable no-console */
import { getState } from 'services/reduxService';

/**
 * Returns project name from given value in url path.
 *
 * @param {String} path
 */
export function getProjectNameFromPath(path) {
  const state = getState();

  if (!path.trim() || !state || !state.projects) {
    return ' ';
  }

  const { projects } = state.projects;

  const pathArr = path.trim().split('/project/');
  const projectId = pathArr[1];

  if (!projectId) {
    return ' ';
  }

  const project = projects.find(project => {
    return project._id === projectId;
  });

  if (project) {
    return project.name;
  }
}

/**
 * Returns role of current user in a project.
 *
 * @param {String} projectId
 */
export function getCurrentUserRoleInProject(projectId) {
  const state = getState();

  if (!projectId || !state || !state.projects || !state.accountInfo) {
    return '';
  }

  const {
    projects: { projects },
    accountInfo: { userId },
  } = state;

  const project = projects.find(item => {
    // eslint-disable-next-line eqeqeq
    return item._id == projectId;
  });

  console.log(project);

  const member = project.members.find(member => {
    return member.userId === userId;
  });

  return member.role;
}

/**
 * Returns list of members of a project.
 *
 * @param {String} projectId
 */
export function getMembersListInProject(projectId) {
  const state = getState();

  if (!projectId || !state || !state.projects) {
    return '';
  }

  const {
    projects: { projects },
  } = state;

  const project = projects.find(item => {
    // eslint-disable-next-line eqeqeq
    return item._id == projectId;
  });

  return project.members;
}
