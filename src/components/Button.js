import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, onClick, children }) => (
  <button className={`button button--${className}`} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: null,
  className: 'white',
};

export default Button;
