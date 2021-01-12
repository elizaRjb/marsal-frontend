import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { PATHS } from 'routePaths';

import { USER_ROLES } from 'utils/constants';

const SidebarNavigation = props => {
  const {
    userRole,
    projectId,
    match: { path },
  } = props;

  return (
    <div className="sidebar-nav">
      <ul className="sidebar-nav__list">
        <li>
          <NavLink
            to={`/project/${projectId}/`}
            title="Backlog"
            isActive={() => {
              return path === PATHS.PROJECT_PATH || path === PATHS.PROJECT_TASK_PATH;
            }}
          >
            Backlog
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/project/${projectId}/board`}
            title="Board"
            isActive={() => {
              return path === PATHS.PROJECT_BOARD_PATH;
            }}
          >
            Board
          </NavLink>
        </li>
        {userRole === USER_ROLES.admin ? (
          <li>
            <NavLink
              to={`/project/${projectId}/settings`}
              title="Settings"
              isActive={() => {
                return path === PATHS.PROJECT_SETTINGS_PATH;
              }}
            >
              Settings
            </NavLink>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default withRouter(SidebarNavigation);
