import React from 'react';

import { LOGO, TEAMWORK } from 'utils/images';

const ProjectInformationSection = () => (
  <>
    <a href="#" title="Marsal" className="main-page__logo">
      <img src={LOGO} alt="Marsal" />
    </a>
    <p className="main-page__main-text">Collaborate with your teams in a fun and efficient way!</p>
    <p className="main-page__sub-text">
      Marsal lets you organize your projects, manage the priorities, and get more work done.
    </p>
    <img className="main-page__image" src={TEAMWORK} alt="Teamwork" />
  </>
);

export default ProjectInformationSection;
