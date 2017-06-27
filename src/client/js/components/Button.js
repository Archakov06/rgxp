import React from 'react';

const Button = ({className, onClick, children}) => (
  <button className={`button button--${className}`} onClick={onClick}>{children}</button>
);

export default Button;
