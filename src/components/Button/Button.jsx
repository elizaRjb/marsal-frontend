import React from 'react';

const Button = props => {
  const { type = 'button', onClick, children, className, style, disabled, title } = props;

  let buttonClassName = 'button ';

  if (style) {
    buttonClassName += `button--${style} `;
  }

  if (className) {
    buttonClassName += className;
  }

  return (
    <button type={type} onClick={onClick} className={buttonClassName} disabled={disabled} title={title}>
      {children}
    </button>
  );
};

export default Button;
