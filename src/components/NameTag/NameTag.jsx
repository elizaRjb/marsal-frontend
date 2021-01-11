import React from 'react';

import { USER_ICON_EMPTY } from 'utils/images';

const NameTag = props => {
  const { initials, className, size = 'md', empty = false, title = '' } = props;

  let nameTagClassName = 'name-tag ';

  if (size) {
    nameTagClassName += `name-tag--${size} `;
  }

  if (className) {
    nameTagClassName += className;
  }

  return (
    <div className={nameTagClassName} title={title}>
      {empty ? <img src={USER_ICON_EMPTY} alt="Unassigned" /> : <span className="name-tag__text">{initials}</span>}
    </div>
  );
};

export default NameTag;
