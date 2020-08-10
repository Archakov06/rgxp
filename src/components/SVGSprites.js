import React from 'react';
import PropTypes from 'prop-types';

const SVGLink = ({ name, title, className }) => (
  <svg id={name} title={title} className={`icon ${className ? className : ''}`}>
    <use xlinkHref={`/sprite.svg#${name}`} />
  </svg>
);

SVGLink.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

export { SVGLink };
