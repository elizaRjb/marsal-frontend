import React from 'react';

const ProjectDashboardEmptyState = props => {
  const { text, className } = props;

  return <div className={`project-dashboard__empty-block ${className}`}>{text}</div>;
};

export default ProjectDashboardEmptyState;
