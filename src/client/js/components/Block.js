import React from 'react';

const Block = ({className, children}) => (
  <div className={`white-block ${className}`}>
      {children}
  </div>
);

export default Block;
