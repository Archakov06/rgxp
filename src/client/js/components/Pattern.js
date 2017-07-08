import React, {Component, PropTypes} from 'react';
import Block from './Block';
import {SVGLink} from '../components/SVGSprites';

import Tippy from 'tippy.js/dist/tippy.js';

export default class Pattern extends Component {

  static propTypes = {
    obj: PropTypes.object.isRequired,
    appActions: PropTypes.object.isRequired,
    axios: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    getPatterns: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isValid: null,
      value: null,
      pattern: this.props.obj.pattern,
      matches: []
    };

    this.handleTestChange = this.handleTestChange.bind(this);
  }

  handleTestChange() {
    let {pattern} = this.props.obj;
    let flag = pattern.match('\/([gimy]{1,4})$');

    if (flag) {
      pattern = pattern.slice(1, pattern.indexOf(flag[0]));
      flag = flag[1];
    }

    const exp = new RegExp(pattern, flag ? flag : '');
    const matches = this.testInput.value.match(exp);

    this.setState({
      isValid: exp.test(this.testInput.value),
      value: this.testInput.value,
      matches: matches ? matches.filter(e => e) : []
    });
  }

  setTippy() {
    setTimeout(() => new Tippy('.tippy', {
      animation: 'shift',
      theme: 'light',
      arrow: true
    }));
  }

  componentWillUpdate() {
    this.setTippy();
  }

  componentWillMount() {
    this.setTippy();
  }

  setRating(obj, status) {
    const {setAction} = this.props.appActions;
    const rating = status === 'down' ? (parseInt(obj.rating) - 1) : (parseInt(obj.rating) + 1);
    this.props.axios({
      method: 'PUT',
      url: `https://594bb8b2ba07670011435299.mockapi.io/patterns/${obj.id}`,
      data: {
        rating: rating
      }
    }).then((response) => {
      if (response.data.hasOwnProperty('id')) {
        setAction('SET_RATING', {
          id: obj.id,
          status: status
        });
      }
    }).catch((error) => console.error(error));
  }

  patternChange(event) {
    this.setState({pattern: event.target.value}, this.handleTestChange);
  }

  render() {
    let description = '';
    let title = '';
    let pattern = '';
    const {store, obj, getPatterns} = this.props;

    if (obj.description) {
      description = store.language === 'ru' && obj.description.hasOwnProperty('ru') ?
      obj.description.ru : obj.description.en;
    }

    if (obj.title) {
      title = this.props.store.language === 'ru' && obj.title.hasOwnProperty('ru') ?
      obj.title.ru : obj.title.en;
    }

    if (obj.pattern[0] == '/') {
      pattern = obj.pattern;
    } else {
      pattern = `/${obj.pattern}/`;
    }

    return (
      <Block className='pattern-block'>
        <div className={`pattern-block__head pattern-block__head--${obj.tags.split(',').pop()}`}>
          <b>{title}</b>
          {description ? <SVGLink className='tippy' title={description} name='info-icon' /> : ''}
        </div>
        <div className='pattern-block__content'>
          <div className='pattern-block__pattern-input'>
            <input
              className='gray-input'
              type='text'
              readOnly='readOnly'
              onChange={this.patternChange.bind(this)}
              onClick={e => e.target.select()}
              value={pattern}
            />
          </div>
          <div className='pattern-block__pattern-test'>
            <div className={`pattern-block__pattern-status ${ (this.state.value && typeof this.state.isValid != 'undefined') ? (this.state.value && this.state.isValid) ? 'pattern-block__pattern-status--green' : 'pattern-block__pattern-status--red' : '' }`}>
              <SVGLink name='complete-icon' />
              <SVGLink name='error-icon' />
            </div>
            <input
              ref={input => this.testInput = input}
              onChange={this.handleTestChange}
              type='text'
              className={this.state.value && typeof this.state.isValid != 'undefined' ? 'has-status' : ''}
              defaultValue={`${obj.defaultValue ? obj.defaultValue : ''}`}
              placeholder={`${obj.placeholder ? obj.placeholder : ''}`}
            />
          </div>
          <div className='pattern-block__pattern-bottom'>
            <ul className='pattern-block__pattern-tags'>
              {
                obj.tags
                .split(',')
                .sort((a, b)=>a.length - b.length)
                .slice(0, 3)
                .map((tag, index)=>{
                  return <li onClick={getPatterns.bind('', tag)} key={index}>{tag}</li>
                })
              }
            </ul>

            <ul className='pattern-block__pattern-tags pattern-block__pattern-tags--matches'>
              {
                this.state.matches
                .sort((a, b)=>a.length - b.length)
                .map((match, index) => {
                  return <li key={index}>{match}</li>
                })
              }
            </ul>

            <ul style={{ display: 'none' }} className='pattern-block__pattern-vote'>
              <li onClick={this.setRating.bind(this, obj, 'up')}>
                <SVGLink name='arrow' />
              </li>
              <li>
                <b className={ (obj.rating > 0 && 'positive') || (obj.rating < 0 && 'negative') }>{obj.rating}</b>
              </li>
              <li onClick={this.setRating.bind(this, obj, 'down')}>
                <SVGLink name='arrow' />
              </li>
            </ul>

          </div>
        </div>
      </Block>
    )
  }
}
