import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

import { createProject } from 'actions/projects';

import Modal from 'components/Modal/Modal';

import AddProjectForm from './AddProjectForm';

class AddProjectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: ''
    };
  }

  handleCreateProject = data => {
    const { createProject, history } = this.props;

    this.setState({ isLoading: true });

    const callbackSuccess = project => {
      this.setState({ isLoading: false });
      toast.success('Project added successfully!');

      history.push(`/project/${project._id}/`);
    };

    const callbackError = error => {
      this.setState({ isLoading: false, error });
    };

    createProject(data, callbackSuccess, callbackError);
  };

  render() {
    const { isLoading, error } = this.state;
    const { showModal, onCloseModal } = this.props;

    return (
      <Modal showModal={showModal} onCloseModal={onCloseModal}>
        <h2 className="projects-list__modal-heading">Create Project</h2>
        {error && <div className="projects-list__form-error">{error}</div>}
        <AddProjectForm handleSubmit={this.handleCreateProject} handleCloseModal={onCloseModal} isLoading={isLoading} />
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createProject: (data, callbackSuccess, callbackError) => dispatch(createProject(data, callbackSuccess, callbackError))
});

const ReduxAddProjectModal = connect(null, mapDispatchToProps)(AddProjectModal);

export default withRouter(ReduxAddProjectModal);
