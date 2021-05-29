/* eslint-disable no-console */
import React, { Component } from 'react';

import { TASK_PRIORITIES } from 'utils/constants';

import PriorityIcon from 'components/PriorityIcon/PriorityIcon';

class PriorityDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    };
  }

  toggleDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };

  closeDropdown = () => {
    this.setState({ showDropdown: false });
  };

  handleDropdownItemClick = selectedItem => {
    const { onDropdownItemClick } = this.props;

    onDropdownItemClick('priority', selectedItem);

    this.setState({ showDropdown: false });
  };

  render() {
    const { showDropdown } = this.state;
    const { value } = this.props;

    const dropdownClassName = showDropdown ? 'dropdown dropdown--open' : 'dropdown';

    return (
      <div className={dropdownClassName} tabIndex="0" onBlur={this.closeDropdown}>
        <div className="dropdown__text" onClick={this.toggleDropdown}>
          <PriorityIcon type={value.toLowerCase()} />
          <span>{value}</span>
        </div>
        {showDropdown && (
          <ul className="dropdown__list">
            {TASK_PRIORITIES.map(priority => {
              return (
                <li key={priority} onClick={() => this.handleDropdownItemClick(priority)}>
                  <PriorityIcon type={priority.toLowerCase()} />
                  <span>{priority}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default PriorityDropdown;
