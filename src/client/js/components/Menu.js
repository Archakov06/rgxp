import React, { Component, } from 'react';

import Block from './Block';
import {SVGLink} from '../components/SVGSprites';

export default class Menu extends Component {

  constructor(props){
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  navigate(tag){
    this.props.getPatterns(tag);
  }

  search(){
    const { setAction } = this.props.appActions;
    setAction('SEACH_PATTERNS', this.searchInput.value);
  }

  render(){
    return (
      <Block className="menu-block">
        <ul>
          {
            this.props.dict.menu.map((item, index)=>
              <li
                key={index}
                onClick={this.navigate.bind('', item.url)}
                className={`menu-block__item menu-block__item--${item.url} ${this.props.currentStore.tag == item.url ? 'active' : ''}`}>
                <a href="javascript://">{item.label}</a>
              </li>
            )
          }
          <li
            className={`menu-block__item menu-block__item--other`}>
            <a href="javascript://">{this.props.dict.otherMenuLabel}</a>
            <ul>
              {
                this.props.dict.otherMenu.map((item, index)=>
                  <li
                    key={index}
                    onClick={this.navigate.bind('', item.url)}>
                    <a href="javascript://">{item.label}</a>
                  </li>
                )
              }
            </ul>
          </li>
          <li className="menu-block__item menu-block__item--search">
            <SVGLink name="search" />
            <input
              id="search-input"
              type="text"
              ref={(input)=>{ this.searchInput = input }}
              onKeyUp={this.search.bind(this)}
              placeholder={this.props.dict.searchPlaceholder}
            />
          </li>
        </ul>
      </Block>
    )
  }
}
