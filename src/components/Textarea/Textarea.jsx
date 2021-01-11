import React from 'react';

const Textarea = props => {
  const { name, label, placeholder, value, disabled, errorMessage, hasError, onChange } = props;

  let inputFieldClassName = 'input__field input__field--textarea ';

  if (hasError) {
    inputFieldClassName += 'input__field--error';
  }

  return (
    <div className="input">
      {label && <label className="input__label">{label}</label>}
      <textarea
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        className={inputFieldClassName}
        value={value}
      ></textarea>
      {hasError && <span className="input__error">{errorMessage}</span>}
    </div>
  );
};

export default Textarea;
