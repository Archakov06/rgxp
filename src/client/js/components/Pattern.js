import React, { Component, } from 'react';
import Block from './Block';
import {SVGLink} from '../components/SVGSprites';

import Tippy from 'tippy.js/dist/tippy.js';

export default class Pattern extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isValid: undefined,
      value: '',
    };

    this.handleTestChange = this.handleTestChange.bind(this);
  }

  handleTestChange(){
    const exp = new RegExp(this.props.obj.pattern);
    this.setState({
      isValid: exp.test(this.testInput.value),
      value: this.testInput.value
    });
  }

  componentWillUpdate(){
    setTimeout(() => new Tippy('.tippy', {
      animation: 'shift',
      theme: 'light',
      arrow: true,
    }));
  }

  componentWillMount(){
    setTimeout(() => new Tippy('.tippy', {
      animation: 'shift',
      theme: 'light',
      arrow: true,
    }));
  }

  setRating(obj, status){
    const { setAction } = this.props.appActions;

    const rating = status == 'down' ? parseInt(obj.rating) - 1 : parseInt(obj.rating) + 1;

    this.props.axios({
      method: 'PUT',
      url: `https://594bb8b2ba07670011435299.mockapi.io/patterns/${obj.id}`,
      data: {
        rating: rating
      }
    }).then(function (response) {
      if (response.data.hasOwnProperty('id')) {
        setAction('SET_RATING', {
          id: obj.id,
          status: status
        });
      }
    }).catch(function (error) {
      console.error(error);
    });

  }

  render() {
    return (
      <Block className="pattern-block">
        <div className={`pattern-block__head pattern-block__head--${this.props.obj.tags.split(',').pop()}`}>
          <b>{this.props.obj.title}</b>
          {
            this.props.obj.description ? <SVGLink className="tippy" title={`${this.props.obj.description ? this.props.obj.description : ''}`} name="info-icon" /> : ''
          }
        </div>
        <div className="pattern-block__content">
          <div className="pattern-block__pattern-input">
            <input className="gray-input" type="text" readOnly="readonly" value={`${this.props.obj.pattern}`} />
          </div>
          <div className="pattern-block__pattern-test">
            <div className={`pattern-block__pattern-status ${ (this.state.value && this.state.isValid != undefined) ? (this.state.value && this.state.isValid) ? 'pattern-block__pattern-status--green' : 'pattern-block__pattern-status--red' : '' }`}>
              <SVGLink name="complete-icon" />
              <SVGLink name="error-icon" />
            </div>
            <input
              ref={(input)=>{ this.testInput = input; }}
              onChange={this.handleTestChange}
              type="text"
              className={`${ (this.state.value && this.state.isValid != undefined) ? 'has-status' : '' }`}
              defaultValue={`${this.props.obj.defaultValue ? this.props.obj.defaultValue : ''}`}
              placeholder={`${this.props.obj.placeholder ? this.props.obj.placeholder : ''}`}
            />
          </div>
          <div className="pattern-block__pattern-bottom">
            <ul className="pattern-block__pattern-tags">
              {
                this.props.obj.tags
                .split(',')
                .sort((a, b)=>a.length - b.length)
                .slice(0,3).map((tag, index)=>{
                  return <li onClick={this.props.getPatterns.bind('', tag)} key={index}>{tag}</li>
                })
              }
            </ul>
            <ul className="pattern-block__pattern-vote">
              <li onClick={this.setRating.bind(this, this.props.obj, 'up')}>
                <SVGLink name="arrow" />
              </li>
              <li>
                <b className={ (this.props.obj.rating > 0 && 'positive') || (this.props.obj.rating < 0 && 'negative') }>{this.props.obj.rating}</b>
              </li>
              <li onClick={this.setRating.bind(this, this.props.obj, 'down')}>
                <SVGLink name="arrow" />
              </li>
            </ul>
          </div>
        </div>
      </Block>
    )
  }
}
