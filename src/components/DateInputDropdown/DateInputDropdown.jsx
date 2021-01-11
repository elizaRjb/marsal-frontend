import React, { Component } from 'react';

import { CALENDAR_ICON_EMPTY } from 'utils/images';

class DateInputDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      selectedDate: this.props.value,
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
    const { showDropdown } = this.state;

    const dropdownClassName = showDropdown ? 'dropdown dropdown dropdown--open' : 'dropdown';

    const inputDate = (
      <div className="dropdown__text-block dropdown__text-block--empty">
        <img className="dropdown__text-block-icon" src={CALENDAR_ICON_EMPTY} alt="No due date" aria-hidden={true} />
        <span>No due date</span>
      </div>
    );

    return (
      <div className={dropdownClassName} tabIndex="0" onBlur={this.closeDropdown}>
        <div className="dropdown__text" onClick={this.toggleDropdown}>
          {inputDate}
        </div>
      </div>
    );
  }
}

export default DateInputDropdown;
