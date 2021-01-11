import React from 'react';

const TaskInput = props => {
  const { className, name, disabled, placeholder = '', value, onChange } = props;

  let taskInputClassName = 'task-details__input ';

  if (className) {
    taskInputClassName += className;
  }

  const text = value ? value : placeholder;

  return (
    <div className={taskInputClassName}>
      <div className="task-details__input-placeholder">{text}</div>
      <textarea placeholder={placeholder} name={name} onChange={onChange} disabled={disabled} value={value}></textarea>
    </div>
  );
};

export default TaskInput;
