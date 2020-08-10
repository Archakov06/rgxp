import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';

import Block from './Block';
import { SVGLink } from '../components/SVGSprites';

const Menu = ({ dict, currentTag, search }) => (
  <Block className="menu-block">
    <ul>
      {dict.menu.map((item, index) => {
        const activeClass = currentTag === item.url ? ' active' : '';
        return (
          <li
            key={'menu-' + item.url}
            onClick={search.bind(this, item.url)}
            className={`menu-block__item menu-block__item--${item.url}${activeClass}`}>
            <span>{item.label}</span>
          </li>
        );
      })}
      <li className={`menu-block__item menu-block__item--other`}>
        <span>{dict.otherMenuLabel}</span>
        <ul>
          {dict.otherMenu.map((item, index) => (
            <li key={index} onClick={search.bind(this, item.url)}>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </li>
      <li className="menu-block__item menu-block__item--search">
        <SVGLink name="search" />
        <input
          id="search-input"
          type="text"
          onKeyUp={(e) => search(e.target.value)}
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
    search: ({ history }) => (tag) => history.push({ pathname: '', search: 'search=' + tag }),
  }),
)(Menu);
