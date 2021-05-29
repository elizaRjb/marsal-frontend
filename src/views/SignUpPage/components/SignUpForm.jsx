import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

const SignUpForm = props => {
  const { isLoading, handleSubmit } = props;

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, 'First name should be minimum 2 characters.')
        .max(15, 'First name should be maximum 15 characters.')
        .required('This field is required.'),
      lastName: Yup.string()
        .min(2, 'Last name should be minimum 2 characters.')
        .max(15, 'Lirst name should be maximum 15 characters.')
        .required('This field is required.'),
      email: Yup.string().email('Email format is not valid.').required('This field is required.'),
      password: Yup.string().min(8, 'Password should be minimum 8 characters.').required('This field is required.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match.')
        .required('This field is required.')
    }),
    onSubmit: values => {
      const { firstName, lastName, email, password } = values;

      handleSubmit({ firstName, lastName, email, password });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-sm-6">
          <Input
            name="firstName"
            type="text"
            placeholder="First name"
            label="First name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            hasError={formik.errors.firstName && formik.touched.firstName}
            errorMessage={formik.errors.firstName}
          />
        </div>
        <div className="col-sm-6">
          <Input
            name="lastName"
            type="text"
            placeholder="Last name"
            label="Last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            hasError={formik.errors.lastName && formik.touched.lastName}
            errorMessage={formik.errors.lastName}
          />
        </div>
      </div>
      <Input
        name="email"
        type="email"
        placeholder="someone@example.com"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        hasError={formik.errors.email && formik.touched.email}
        errorMessage={formik.errors.email}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        hasError={formik.errors.password && formik.touched.password}
        errorMessage={formik.errors.password}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        label="Confirm Password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        hasError={formik.errors.confirmPassword && formik.touched.confirmPassword}
        errorMessage={formik.errors.confirmPassword}
      />
      <Button type="submit" className="main-page__form-button" variant="primary" disabled={isLoading}>
        {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
      </Button>
    </form>
  );
};

export default SignUpForm;
