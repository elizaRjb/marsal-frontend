import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { PLUS_ICON_BLUE, DASHBOARD_ICONS } from 'utils/images';

import { getProjectsList } from 'selectors/projects';

import { getProjectsListRequest } from 'actions/projects';

import Button from 'components/Button/Button';

import AddProjectModal from './components/AddProjectModal';
import ProjectsListLoading from './components/ProjectsListLoading';

class ProjectsListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      showModal: false,
    };
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  componentDidMount() {
    const { getProjectsListRequest } = this.props;

    const callbackSuccess = () => {
      this.setState({ isLoading: false });
    };

    const callbackError = error => {
      this.setState({ isLoading: false, error });
    };

    getProjectsListRequest(callbackSuccess, callbackError);
  }

  render() {
    const { isLoading, showModal } = this.state;
    const { projectsList } = this.props;

    if (isLoading) {
      return <ProjectsListLoading />;
    }

    const projects = [];

    if (projectsList && projectsList.length) {
      projectsList.map(project => {
        projects.push(
          <Link to={`/project/${project._id}/`} className="projects-list__item" key={project._id}>
            <img src={DASHBOARD_ICONS[project.colorScheme]} alt="Dashboard" />
            <span>{project.name}</span>
          </Link>
        );
      });
    }

    return (
      <div className="projects-list">
        {projects}
        <Button type="button" className="projects-list__button" onClick={this.openModal}>
          <img src={PLUS_ICON_BLUE} alt="Plus" />
          <span>Create Project</span>
        </Button>
        <AddProjectModal showModal={showModal} onCloseModal={this.closeModal} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projectsList: getProjectsList(state),
});

const mapDispatchToProps = dispatch => ({
  getProjectsListRequest: (callbackSuccess, callbackError) =>
    dispatch(getProjectsListRequest(callbackSuccess, callbackError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListPage);
