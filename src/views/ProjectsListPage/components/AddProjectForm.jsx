import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Textarea from 'components/Textarea/Textarea';

const AddProjectForm = props => {
  const { handleCloseModal, handleSubmit, isLoading } = props;

  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectTag: '',
      projectDescription: ''
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required('This field is required.'),
      projectTag: Yup.string()
        .min(2, 'Project tag should contain minimum 2 characters and maximum 5 characters.')
        .max(5, 'Project tag should contain minimum 2 characters and maximum 5 characters.')
        .matches(/^[A-Za-z]+$/, 'Project tag should contain alphabets only.')
        .required('This field is required.'),
      projectDescription: Yup.string()
    }),
    onSubmit: values => {
      const { projectName, projectTag, projectDescription } = values;

      handleSubmit({
        name: projectName.trim(),
        tag: projectTag.trim().toUpperCase(),
        description: projectDescription.trim()
      });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="projects-list__modal-body">
        <Input
          type="text"
          name="projectName"
          label="Project Name:*"
          placeholder="Project Name"
          value={formik.values.projectName}
          onChange={formik.handleChange}
          hasError={formik.errors.projectName && formik.touched.projectName}
          errorMessage={formik.errors.projectName}
        />
        <Input
          type="text"
          name="projectTag"
          label="Project Tag:*"
          placeholder="Project Tag"
          value={formik.values.projectTag}
          onChange={formik.handleChange}
          hasError={formik.errors.projectTag && formik.touched.projectTag}
          errorMessage={formik.errors.projectTag}
        />
        <Textarea
          name="projectDescription"
          label="Project Description:"
          placeholder="Project Description"
          value={formik.values.projectDescription}
          onChange={formik.handleChange}
          hasError={formik.errors.projectDescription && formik.touched.projectDescription}
          errorMessage={formik.errors.projectDescription}
        />
      </div>
      <div className="projects-list__modal-footer">
        <Button
          type="button"
          variant="ghost"
          className="projects-list__modal-btn"
          disabled={isLoading}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="projects-list__modal-btn" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default AddProjectForm;
