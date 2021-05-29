import React, { Component } from 'react';

import { PROJECT_STAGES } from 'utils/constants';

class StagesDropdown extends Component {
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

    onDropdownItemClick('stage', selectedItem);

    this.setState({ showDropdown: false });
  };

  render() {
    const { showDropdown } = this.state;
    const { value } = this.props;

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
