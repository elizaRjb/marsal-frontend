import React, { Component } from 'react';

import NameTag from 'components/NameTag/NameTag';

import { getInitialsFromName } from 'utils/utils';

class UserDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
    };
  }

  toggleDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };

  closeDropdown = () => {
    this.setState({ showDropdown: false });
  };

  handleDropdownItemClick = selectedUserId => {
    const { usersList, onDropdownItemClick } = this.props;

    const selectedUser = usersList.find(user => {
      return user.userId === selectedUserId;
    });

    onDropdownItemClick(selectedUser);

    this.setState({ showDropdown: false });
  };

  render() {
    const { showDropdown } = this.state;

    const { usersList, selectedUser } = this.props;

    const dropdownClassName = showDropdown ? 'dropdown dropdown dropdown--open' : 'dropdown';

    let user = (
      <div className="dropdown__text-block dropdown__text-block--empty">
        <NameTag empty={true} />
        <span>Unassigned</span>
      </div>
    );

    if (selectedUser && Object.keys(selectedUser).length && selectedUser.userId) {
      user = (
        <div className="dropdown__text-block">
          <NameTag
            initials={getInitialsFromName(selectedUser.name)}
            className={`dropdown__name-tag--${selectedUser.colorScheme}`}
          />
          <span>{selectedUser.name}</span>
        </div>
      );
    }

    return (
      <div className={dropdownClassName} tabIndex="0" onBlur={this.closeDropdown}>
        <div className="dropdown__text" onClick={this.toggleDropdown}>
          {user}
        </div>
        {showDropdown && (
          <ul className="dropdown__list dropdown__list--lg">
            {usersList.map(user => {
              const nameInitials = getInitialsFromName(user.name);

              return (
                <li key={user.userId} onClick={() => this.handleDropdownItemClick(user.userId)} title={user.email}>
                  <NameTag initials={nameInitials} className={`dropdown__name-tag--${user.colorScheme}`} />
                  <div className="dropdown__text-group">
                    <span>{user.name}</span>&nbsp;
                    <span className="dropdown__sub-text">{user.email}</span>
                  </div>
                </li>
              );
            })}
            <li className="dropdown__action-item">
              <div className="button button--ghost dropdown__list-btn" onClick={() => this.handleDropdownItemClick({})}>
                Unassign
              </div>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

export default UserDropdown;
