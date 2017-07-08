import React, {Component, PropTypes} from 'react';

import Block from './Block';
import {SVGLink} from '../components/SVGSprites';

export default class Menu extends Component {

  static propTypes = {
    appActions: PropTypes.object.isRequired,
    getPatterns: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  search(tag) {
    const {getPatterns} = this.props;
    let val;
    if (tag) {
      val = tag;
    } else {
      val = this.searchInput.value;
    }
    getPatterns(val);
  }

  render() {
    const {dict, currentStore} = this.props;
    return (
      <Block className='menu-block'>
        <ul>
          {
            dict.menu.map((item, index) => {
              const activeClass = currentStore.tag === item.url ? ' active' : '';
              return (
                <li
                  key={index}
                  onClick={this.search.bind(this, item.url)}
                  className={`menu-block__item menu-block__item--${item.url}${activeClass}`}>
                  <a>{item.label}</a>
                </li>
              );
            })
          }
          <li
            className={`menu-block__item menu-block__item--other`}>
            <a>{dict.otherMenuLabel}</a>
            <ul>
              {
                dict.otherMenu.map((item, index) => (
                  <li
                    key={index}
                    onClick={this.search.bind(this, item.url)}>
                    <a>{item.label}</a>
                  </li>
                ))
              }
            </ul>
          </li>
          <li className='menu-block__item menu-block__item--search'>
            <SVGLink name='search' />
            <input
              id='search-input'
              type='text'
              ref={input => this.searchInput = input}
              onKeyUp={this.search.bind(this, null)}
              placeholder={dict.searchPlaceholder}
            />
          </li>
        </ul>
      </Block>
    );
  }
}
