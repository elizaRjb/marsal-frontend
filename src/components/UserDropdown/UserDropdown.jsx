import React, { Component } from 'react';

import NameTag from 'components/NameTag/NameTag';

import { getInitialsFromName } from 'utils/utils';

class UserDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      selectedUser: this.props.value,
    };
  }

  toggleDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };

  closeDropdown = () => {
    this.setState({ showDropdown: false });
  };

  handleDropdownItemClick = selectedUserId => {
    const { usersList } = this.props;

    const selectedUser = usersList.find(user => {
      return user.userId === selectedUserId;
    });

    this.setState({ selectedUser, showDropdown: false });
  };

  render() {
    const { showDropdown, selectedUser } = this.state;

    const { usersList } = this.props;

    const dropdownClassName = showDropdown ? 'dropdown dropdown dropdown--open' : 'dropdown';

    let user = (
      <div className="dropdown__text-block dropdown__text-block--empty">
        <NameTag empty={true} />
        <span>Unassigned</span>
      </div>
    );

    if (selectedUser && Object.keys(selectedUser).length) {
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
                <li key={user._id} onClick={() => this.handleDropdownItemClick(user.userId)} title={user.email}>
                  <NameTag initials={nameInitials} className={`dropdown__name-tag--${user.colorScheme}`} />
                  <div className="dropdown__text-group">
                    <span>{user.name}</span>&nbsp;
                    <span className="dropdown__sub-text">{user.email}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default UserDropdown;
