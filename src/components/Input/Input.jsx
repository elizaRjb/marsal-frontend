import React from 'react';

const Input = props => {
  const { type, name, label, placeholder, value, disabled, errorMessage, hasError, onChange } = props;

  const inputFieldClassName = hasError ? 'input__field input__field--error' : 'input__field';

  return (
    <div className="input">
      {label && <label className="input__label">{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={inputFieldClassName}
      />
      {hasError && <span className="input__error">{errorMessage}</span>}
    </div>
  );
};

export default Input;
