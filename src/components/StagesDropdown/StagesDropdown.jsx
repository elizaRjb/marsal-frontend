import React, { Component } from 'react';

import { PROJECT_STAGES } from 'utils/constants';

class StagesDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      value: this.props.value,
    };
  }

  toggleDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };

  closeDropdown = () => {
    this.setState({ showDropdown: false });
  };

  handleDropdownItemClick = selectedItem => {
    // const { onDropdownItemClick } = this.props;

    // onDropdownItemClick(selectedItem);

    this.setState({ value: selectedItem, showDropdown: false });
  };

  render() {
    const { showDropdown, value } = this.state;

    const dropdownClassName = showDropdown ? 'dropdown dropdown--open' : 'dropdown';

    return (
      <div className={dropdownClassName} tabIndex="0" onBlur={this.closeDropdown}>
        <div className="dropdown__text" onClick={this.toggleDropdown}>
          {value}
        </div>
        {showDropdown && (
          <ul className="dropdown__list">
            {PROJECT_STAGES.map(stage => {
              return (
                <li key={stage} onClick={() => this.handleDropdownItemClick(stage)}>
                  {stage}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default StagesDropdown;
