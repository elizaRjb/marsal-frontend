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

  const pathArr = path.trim().split('/');
  const projectId = pathArr[2];

  if (!projectId) {
    return ' ';
  }

  const project = projects.find(item => {
    return item._id.toString() === projectId;
  });

  return project.name;
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

  const member = project.members.find(member => {
    return member.userId === userId;
  });

  return member.role;
}

/**
 * Returns user in a project.
 *
 * @param {String} projectId
 * @param {String} userId
 */
export function getUserDetailsOfProject(projectId, userId) {
  const state = getState();

  if (!projectId || !userId || !state || !state.projects) {
    return '';
  }

  const {
    projects: { projects },
  } = state;

  const project = projects.find(item => {
    return item._id.toString() === projectId.toString();
  });

  const member = project.members.find(member => {
    return member.userId === userId;
  });

  return member;
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

/**
 * Returns task tag of a task in a project.
 *
 * @param {String} projectId
 * @param {String} taskId
 */
export function getTagOfTaskInProject(projectId, taskId) {
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

  if (project.tasks) {
    const tasks = project.tasks;

    const task = tasks.find(task => {
      // eslint-disable-next-line eqeqeq
      return task._id == taskId;
    });

    return task.taskTag;
  }

  return '';
}
