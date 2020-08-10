import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';

import Block from './Block';
import { SVGLink } from '../components/SVGSprites';

const Menu = ({ dict, currentTag, search, menuLink }) => (
  <Block className="menu-block">
    <ul>
      {dict.menu.map((item, index) => {
        const activeClass = currentTag === item.url ? ' active' : '';
        return (
          <li
            key={'menu-' + index}
            onClick={search.bind(this, item.url)}
            className={`menu-block__item menu-block__item--${item.url}${
              activeClass
            }`}>
            <a>{item.label}</a>
          </li>
        );
      })}
      <li className={`menu-block__item menu-block__item--other`}>
        <a>{dict.otherMenuLabel}</a>
        <ul>
          {dict.otherMenu.map((item, index) => (
            <li key={index} onClick={search.bind(this, item.url)}>
              <a>{item.label}</a>
            </li>
          ))}
        </ul>
      </li>
      <li className="menu-block__item menu-block__item--search">
        <SVGLink name="search" />
        <input
          id="search-input"
          type="text"
          onKeyUp={e => search(e.target.value)}
          placeholder={dict.searchPlaceholder}
        />
      </li>
    </ul>
  </Block>
);

Menu.propTypes = {
  searchPatterns: PropTypes.func.isRequired,
  currentTag: PropTypes.string.isRequired,
  dict: PropTypes.object.isRequired,
};

export default compose(
  withHandlers({
    search: ({ history }) => tag =>
      history.push({ pathname: '', search: 'search=' + tag }),
  }),
)(Menu);
