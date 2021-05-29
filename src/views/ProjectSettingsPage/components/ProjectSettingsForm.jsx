import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { getInitialsFromName } from 'utils/utils';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import NameTag from 'components/NameTag/NameTag';

const ProjectSettingsForm = props => {
  const { handleSubmit, isLoading, project } = props;

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email format is not valid.').required('This field is required.'),
    }),
    onSubmit: values => {
      const { email } = values;

      handleSubmit({ email: email.trim() });
    },
  });

  let members = [];

  if (project.members.length) {
    members = project.members.map(member => {
      return (
        <li key={member.userId} className="project-settings__user">
          <NameTag
            initials={getInitialsFromName(member.name)}
            className={`project-settings__name-tag--${member.colorScheme}`}
          />
          <div className="project-settings__user-name">
            <span>{member.name}</span>&nbsp;&nbsp;
            <span className="project-settings__sub-text">{member.email}</span>
          </div>
          <div className="project-settings__user-role">{member.role}</div>
        </li>
      );
    });
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="project-settings__section">
        <h2 className="project-settings__section-heading">Project Details:</h2>
        <div className="project-settings__group">
          <div className="project-settings__group-label">Project Name:</div>
          <div className="project-settings__group-text">{project.name}</div>
        </div>
        <div className="project-settings__group">
          <div className="project-settings__group-label">Project Tag:</div>
          <div className="project-settings__group-text">{project.tag}</div>
        </div>
        <div className="project-settings__group">
          <div className="project-settings__group-label">Project Description:</div>
          <div className="project-settings__group-text">{project.description}</div>
        </div>
        <div className="">
          <div className="project-settings__group-label">Project Members:</div>
          <ul className="project-settings__list">{members}</ul>
        </div>
      </div>
      <div className="project-settings__section">
        <h2 className="project-settings__section-heading">Add a member:</h2>
        <div className="project-settings__section-form">
          <div className="project-settings__left-section">
            <Input
              type="email"
              name="email"
              placeholder="someone@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              hasError={formik.errors.email && formik.touched.email}
              errorMessage={formik.errors.email}
            />
          </div>
          <Button type="submit" style="primary" className="project-settings__button" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProjectSettingsForm;
