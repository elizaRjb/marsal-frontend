import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { PATHS } from 'routePaths';

import { getIsLoggedIn } from 'selectors/auth';

import Header from 'components/Header/Header';

class DashboardPage extends Component {
  render() {
    const { children, isLoggedIn, location } = this.props;

    if (!isLoggedIn) {
      return <Redirect to={PATHS.LOGIN_PATH} />;
    }

    const pathname = location && location.pathname ? location.pathname : '';

    return (
      <div className="dashboard-page">
        <Header pathname={pathname} />
        <div className="dashboard-page__body">{children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

export default connect(mapStateToProps, null)(DashboardPage);
