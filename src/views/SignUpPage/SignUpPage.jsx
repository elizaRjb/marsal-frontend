import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { PATHS } from 'routePaths';

import { getIsLoggedIn } from 'selectors/auth';

import { userSignupRequest } from 'actions/account';

import ProjectInformationSection from 'views/ProjectInformationSection/ProjectInformationSection';

import SignUpForm from './components/SignUpForm';

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: ''
    };
  }

  onSubmit = data => {
    const { history, userSignupRequest } = this.props;

    this.setState({ isLoading: true });

    const callbackSuccess = () => {
      this.setState({ isLoading: false });
      history.push(PATHS.DASHBOARD_PATH);
    };

    const callbackError = error => {
      this.setState({ isLoading: false, error });
    };

    userSignupRequest(data, callbackSuccess, callbackError);
  };

  render() {
    const { isLoading, error } = this.state;
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to={PATHS.DASHBOARD_PATH} />;
    }

    return (
      <div className="main-page">
        <div className="container main-page__container">
          <div className="main-page__left-section">
            <ProjectInformationSection />
          </div>
          <div className="main-page__right-section">
            <div className="main-page__card">
              <h2 className="main-page__card-heading">Sign up to create an account!</h2>
              {error && <div className="main-page__card-error">{error}</div>}
              <SignUpForm isLoading={isLoading} handleSubmit={this.onSubmit} />
            </div>
            <p className="main-page__text">
              Already have an account?&nbsp;
              <Link to={PATHS.LOGIN_PATH} className="link">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  userSignupRequest: (data, callbackSuccess, callbackError) =>
    dispatch(userSignupRequest(data, callbackSuccess, callbackError))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
