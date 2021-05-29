import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import reduxStore from 'utils/store';

import { PATHS } from 'routePaths';

import ProjectRoute from 'hoc/ProjectRoute/ProjectRoute';
import ProjectTaskRoute from 'hoc/ProjectTaskRoute/ProjectTaskRoute';

import ToastNotification from 'components/ToastNotification/ToastNotification';

import LoginPage from 'views/LoginPage/LoginPage';
import SignUpPage from 'views/SignUpPage/SignUpPage';
import DashboardPage from 'views/DashboardPage/DashboardPage';
import TaskDetailsPage from 'views/TaskDetailsPage/TaskDetailsPage';
import ProjectListPage from 'views/ProjectsListPage/ProjectsListPage';
import ProjectBoardPage from 'views/ProjectBoardPage/ProjectBoardPage';
import ProjectSettingsPage from 'views/ProjectSettingsPage/ProjectSettingsPage';
import ProjectDashboardPage from 'views/ProjectDashboardPage/ProjectDashboardPage';

/** Main App. */
class App extends Component {
  render() {
    return (
      <Provider store={reduxStore.store}>
        <PersistGate persistor={reduxStore.persistor}>
          <ToastNotification />
          <div className="App">
            <Router>
              <Switch>
                <Route exact path={PATHS.SIGN_UP_PATH} component={SignUpPage} />
                <Route exact path={PATHS.LOGIN_PATH} component={LoginPage} />
                <DashboardPage>
                  <Route exact path={PATHS.DASHBOARD_PATH} component={ProjectListPage} />

                  <ProjectRoute exact path={PATHS.PROJECT_PATH} component={ProjectDashboardPage} />
                  <ProjectRoute exact path={PATHS.PROJECT_BOARD_PATH} component={ProjectBoardPage} />
                  <ProjectRoute exact path={PATHS.PROJECT_SETTINGS_PATH} component={ProjectSettingsPage} />

                  <ProjectTaskRoute exact path={PATHS.PROJECT_TASK_PATH} component={TaskDetailsPage} />
                </DashboardPage>
              </Switch>
            </Router>
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
