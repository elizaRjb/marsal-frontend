import React from 'react';
import { Link } from 'react-router-dom';

import { PATHS } from 'routePaths';

import { LOGO, TEAMWORK } from 'utils/images';

const ProjectInformationSection = () => (
  <>
    <Link to={PATHS.SIGN_UP_PATH} title="Marsal" className="main-page__logo">
      <img src={LOGO} alt="Marsal" />
    </Link>
    <p className="main-page__main-text">Collaborate with your teams in a fun and efficient way!</p>
    <p className="main-page__sub-text">
      Marsal lets you organize your projects, manage the priorities, and get more work done.
    </p>
    <img className="main-page__image" src={TEAMWORK} alt="Teamwork" />
  </>
);

export default ProjectInformationSection;
