export const getProjects = state => state.projects;

export const getProjectsList = state => {
  const projects = getProjects(state);

  if (!projects) {
    return [];
  }

  return projects.projects;
};
