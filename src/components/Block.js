import React from 'react';
import PropTypes from 'prop-types';

const Block = ({ className, children }) => (
  <div className={`white-block ${className}`}>{children}</div>
);

Block.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default Block;
