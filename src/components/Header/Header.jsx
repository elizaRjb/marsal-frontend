import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { PATHS } from 'routePaths';

import { LOGO } from 'utils/images';
import { getInitialsFromName } from 'utils/utils';

import { userLogoutRequest } from 'actions/auth';

import { getProjectNameFromPath } from 'services/projectService';

import { getFullName, getUserColorScheme } from 'selectors/account';

import NameTag from 'components/NameTag/NameTag';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  handleLogout = () => {
    const { userLogoutRequest } = this.props;

    userLogoutRequest();
  };

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  closeDropdown = () => {
    this.setState({ dropdownOpen: false });
  };

  render() {
    const { dropdownOpen } = this.state;
    const { name, colorScheme, pathname } = this.props;
    const nameInitials = getInitialsFromName(name);

    const projectName = getProjectNameFromPath(pathname);

    return (
      <header className="header">
        <div className="header__container">
          <Link to={PATHS.DASHBOARD_PATH} className="header__logo" title="Marsal">
            <img src={LOGO} alt="Marsal" />
          </Link>
          <div className="header__right-section">
            <h2 className="header__project-name">{projectName}</h2>
            <div className="header__dropdown" tabIndex="0" onBlur={this.closeDropdown}>
              <div className="header__dropdown-component" onClick={this.toggleDropdown}>
                <NameTag
                  initials={nameInitials}
                  className={`header__name-tag header__name-tag--${colorScheme}`}
                  size="lg"
                />
              </div>
              {dropdownOpen && (
                <ul className="header__dropdown-list">
                  <li onClick={this.handleLogout}>Logout</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  name: getFullName(state),
  colorScheme: getUserColorScheme(state)
});

const mapDispatchToProps = dispatch => ({
  userLogoutRequest: () => dispatch(userLogoutRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
