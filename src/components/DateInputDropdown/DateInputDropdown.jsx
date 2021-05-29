/* eslint-disable no-console */
import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';

import moment from 'moment';

import { CALENDAR_ICON_EMPTY, CALENDAR_ICON_BLUE } from 'utils/images';

class DateInputDropdown extends Component {
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

  handleDateChange = date => {
    const { onDateChange } = this.props;

    const selectedDate = date ? moment(date).format() : null;

    onDateChange(selectedDate);
  };

  render() {
    const { dateValue } = this.props;

    const selectedDate = dateValue ? moment(dateValue) : null;

    const inputIcon = dateValue ? (
      <img src={CALENDAR_ICON_BLUE} alt="date" aria-hidden={true} />
    ) : (
      <img src={CALENDAR_ICON_EMPTY} alt="no due date" aria-hidden={true} />
    );

    return (
      <SingleDatePicker
        date={selectedDate}
        onDateChange={this.handleDateChange}
        focused={this.state.focused}
        onFocusChange={({ focused }) => this.setState({ focused })}
        id="dueDate"
        readOnly
        showClearDate
        displayFormat="MMM D"
        customInputIcon={inputIcon}
        numberOfMonths={1}
        verticalSpacing={0}
        anchorDirection="right"
        placeholder="No due date"
        horizontalMargin={0}
      />
    );
  }
}

export default DateInputDropdown;
