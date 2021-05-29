/* eslint-disable no-console */
import React from 'react';
import { Route } from 'react-router-dom';

import { getCurrentUserRoleInProject } from 'services/projectService';

import SidebarNavigation from 'components/SidebarNavigation/SidebarNavigation';

const ProjectRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const {
          match: {
            params: { projectId },
          },
        } = props;

        const currentUserRole = getCurrentUserRoleInProject(projectId);

        return (
          <div className="project-dashboard">
            <SidebarNavigation projectId={projectId} userRole={currentUserRole} />
            <div className="project-dashboard__body">
              <Component {...props} />
            </div>
          </div>
        );
      }}
    />
  );
};

export default ProjectRoute;
