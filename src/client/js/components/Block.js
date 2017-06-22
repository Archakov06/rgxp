import React, { Component, } from 'react';

export default class Block extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className={`white-block ${this.props.className}`}>
        {this.props.children}
      </div>
    )
  }
}
