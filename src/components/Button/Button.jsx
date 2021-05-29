import React from 'react';

const Button = props => {
  const { type = 'button', onClick, children, className, variant, disabled, title } = props;

  let buttonClassName = 'button ';

  if (variant) {
    buttonClassName += `button--${variant} `;
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
