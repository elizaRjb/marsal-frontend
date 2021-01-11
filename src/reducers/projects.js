import { SET_PROJECTS_LIST, UPDATE_PROJECTS_LIST } from 'actions/projects';

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
    default:
      return state;
  }
}
