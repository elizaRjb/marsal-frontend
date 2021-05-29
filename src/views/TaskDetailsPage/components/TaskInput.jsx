import React from 'react';

import TextareaAutosize from 'react-autosize-textarea';

const TaskInput = props => {
  const { className, name, disabled, placeholder = '', value, onChange, rows = 1 } = props;

  let taskInputClassName = 'task-details__input ';

  if (className) {
    taskInputClassName += className;
  }

  return (
    <TextareaAutosize
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      className={taskInputClassName}
      rows={rows}
      value={value}
    ></TextareaAutosize>
  );
};

export default TaskInput;
