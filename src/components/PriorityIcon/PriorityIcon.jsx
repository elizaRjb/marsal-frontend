import React from 'react';

const PRIORITY_STYLES = {
  trivial: 'gray',
  minor: 'green',
  medium: 'yellow',
  major: 'orange',
  critical: 'dark-orange'
};

const PriorityIcon = props => {
  const { type, className } = props;

  let priorityIconClassName = 'priority-icon ';

  if (type) {
    priorityIconClassName += `priority-icon--${PRIORITY_STYLES[type]} `;
  }

  if (className) {
    priorityIconClassName += className;
  }

  return <div className={priorityIconClassName} />;
};

export default PriorityIcon;
