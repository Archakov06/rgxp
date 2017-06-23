import React from 'react';

const Button = ({className, onClick, children}) => (
  <button className={`button button--${this.props.className}`} onClick={this.props.onClick}>{this.props.children}</button>
)

export default Button;
