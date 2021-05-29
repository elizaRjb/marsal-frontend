import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

import { getProjectsList } from 'selectors/projects';

import { addMemberInProject } from 'actions/projects';

import ProjectSettingsForm from './components/ProjectSettingsForm';

class ProjectSettingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: ''
    };
  }

  findProject = () => {
    const {
      projects,
      match: {
        params: { projectId }
      }
    } = this.props;

    const project = projects.find(project => {
      return project._id === projectId;
    });

    return project;
  };

  handleSubmit = data => {
    const {
      addMemberInProject,
      match: {
        params: { projectId }
      }
    } = this.props;

    this.setState({ isLoading: true });

    const callbackSuccess = () => {
      this.setState({ isLoading: false });
      toast.success('User added successfully!');
    };

    const callbackError = error => {
      toast.error(error);
      this.setState({ isLoading: false, error });
    };

    addMemberInProject(projectId, data, callbackSuccess, callbackError);
  };

  render() {
    const { isLoading } = this.state;

    const project = this.findProject();

    return (
      <div className="project-settings">
        <ProjectSettingsForm project={project} isLoading={isLoading} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: getProjectsList(state)
});

const mapDispatchToProps = dispatch => ({
  addMemberInProject: (projectId, data, callbackSuccess, callbackError) =>
    dispatch(addMemberInProject(projectId, data, callbackSuccess, callbackError))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectSettingsPage));
