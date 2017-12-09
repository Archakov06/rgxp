import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';

import Block from '../../Block';
import { SVGLink } from '../../SVGSprites';

const Pattern = ({
  obj,
  search,
  language,
  patternChange,
  matches,
  fieldValue,
  isValid,
  handleTestChange,
  copyToClipboard,
  dict,
}) => {
  let description = '';
  if (obj.hasOwnProperty('description')) {
    description = obj.description[language] || obj.description.en;
  }
  let title = obj.title.hasOwnProperty(language)
    ? obj.title[language]
    : obj.title.en;
  let pattern = obj.pattern[0] === '/' ? obj.pattern : `/${obj.pattern}/`;

  return (
    <Block className="pattern-block">
      <div
        className={`pattern-block__head pattern-block__head--${obj.tags
          .split(',')
          .pop()}`}>
        <b title={title}>
          {title.length > 33 ? title.substr(0, 30) + '...' : title}
        </b>
        {description ? (
          <Tooltip
            title={description}
            animation="shift"
            theme="light"
            arrow={true}>
            <SVGLink name="info-icon" />
          </Tooltip>
        ) : (
          ''
        )}
      </div>
      <div className="pattern-block__content">
        <div className="pattern-block__pattern-input">
          <Tooltip
            title={dict.clipboard}
            animation="shift"
            theme="light"
            arrow={true}>
            <input
              className="gray-input"
              type="text"
              readOnly="readOnly"
              onChange={patternChange}
              onClick={copyToClipboard}
              value={pattern}
            />
          </Tooltip>
        </div>
        <div className="pattern-block__pattern-test">
          <div
            className={`pattern-block__pattern-status ${
              fieldValue && typeof isValid !== 'undefined'
                ? fieldValue && isValid
                  ? 'pattern-block__pattern-status--green'
                  : 'pattern-block__pattern-status--red'
                : ''
            }`}>
            <SVGLink name="complete-icon" />
            <SVGLink name="error-icon" />
          </div>
          <input
            onChange={handleTestChange}
            type="text"
            className={
              fieldValue && typeof isValid !== 'undefined' ? 'has-status' : ''
            }
            defaultValue={`${obj.defaultValue ? obj.defaultValue : ''}`}
            placeholder={`${obj.placeholder ? obj.placeholder : ''}`}
          />
        </div>
        <div className="pattern-block__pattern-bottom">
          <ul className="pattern-block__pattern-tags">
            {obj.tags
              .split(',')
              .sort((a, b) => a.length - b.length)
              .slice(0, 3)
              .map((tag, index) => {
                return (
                  <li onClick={search.bind(this, tag)} key={index}>
                    {tag}
                  </li>
                );
              })}
          </ul>

          {matches.length ? (
            <ul className="pattern-block__pattern-tags pattern-block__pattern-tags--matches">
              {matches
                .sort((a, b) => a.length - b.length)
                .map((match, index) => {
                  return <li key={index}>{match}</li>;
                })}
            </ul>
          ) : (
            ''
          )}
        </div>
      </div>
    </Block>
  );
};

Pattern.propTypes = {
  obj: PropTypes.object.isRequired,
  matches: PropTypes.array,
  language: PropTypes.string.isRequired,
  fieldValue: PropTypes.string,
  isValid: PropTypes.bool,
  search: PropTypes.func.isRequired,
  patternChange: PropTypes.func,
  handleTestChange: PropTypes.func,
  copyToClipboard: PropTypes.func,
  dict: PropTypes.object.isRequired,
};

export default Pattern;
