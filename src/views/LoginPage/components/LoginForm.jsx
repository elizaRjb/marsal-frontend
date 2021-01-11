import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

const LoginForm = props => {
  const { isLoading, handleSubmit } = props;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email format is not valid.').required('This field is required.'),
      password: Yup.string().min(8, 'Password should be minimum 8 characters.').required('This field is required.'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
      <Button type="submit" className="main-page__form-button" style="primary" disabled={isLoading}>
        {isLoading ? 'LOGGING IN...' : 'LOG IN'}
      </Button>
    </form>
  );
};

export default LoginForm;
