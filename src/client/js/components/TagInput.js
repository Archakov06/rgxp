import React, { Component } from 'react';

export default class TagInput extends Component {

  static defaultProps = {
    placeholder: 'Enter your tag...',
  };

  static propTypes = {
    placeholder: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
  };

  constructor(props){
    super(props);
    this.onKeyUpHandle = this.onKeyUpHandle.bind(this);
    this.onKeyDownHandle = this.onKeyDownHandle.bind(this);
    this.state = {
      tags: []
    };
  }

  onKeyUpHandle(event){
    if (this.input.value.trim() && (this.input.value.split('').pop() == ',' || event.key === 'Enter')) {
      this.setState({
        tags: [
          ...this.state.tags,
          this.input.value.split('').pop() == ',' ? this.input.value.slice(0, -1) : this.input.value
        ]
      }, () => this.props.onChange(this.state.tags));
      this.input.value = '';
    }
  }

  onKeyDownHandle(event){
    if (!this.input.value.trim() && event.key == 'Backspace') this.removeTag(this.state.tags.length-1);
  }

  removeTag(index){
    this.setState({
    	tags: this.state.tags.filter((_, i) => i !== index)
  	}, () => this.props.onChange(this.state.tags));
  }

  render() {
    return (
      <div>
        {
          this.state.tags.map((item, index) => {
            <div className="tag">
              <span>{item}</span>
              <i onClick={this.removeTag.bind(this, index)}>&times;</i>
            </div>
          })
        }
        <input
          ref={input => this.input = input}
          placeholder={this.props.placeholder}
          id={this.props.id}
          className={this.props.className}
          onKeyUp={this.onKeyUpHandle}
          onKeyDown={this.onKeyDownHandle}
          type="text"
        />
      </div>
    )
  }

}
