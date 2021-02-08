import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';

import { StateContext } from '../context';
import { Pattern } from '../store/reducer';
import { PatternStatus } from './PatternStatus';

type PatternBlockProps = Pattern & {
  isLoading?: boolean;
};

const checkRegExp = (value: string, pattern: string): string[] => {
  const flagMatch = pattern.match('/([gimy]{1,4})$');
  const flag = flagMatch ? flagMatch?.[1] : null;
  let patternValue = flag ? pattern.replace(flag, '') : pattern;
  if (patternValue[0] === '/' && patternValue[patternValue.length - 1] === '/') {
    patternValue = patternValue.slice(1).slice(0, -1);
  }
  const exp = new RegExp(patternValue, flag || '');
  const matches = value.match(exp);
  return [...(matches || [])].filter((v) => v);
};

export const PatternBlock: React.FC<PatternBlockProps> = ({
  title,
  description,
  pattern,
  placeholder,
  tags,
}) => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const { lang } = React.useContext(StateContext);

  const titleVal = title[lang];
  const descriptionVal = description?.[lang];

  const matches = checkRegExp(inputValue, pattern);
  const isCorret = matches?.length > 0;
  const tagsArr = tags.split(',');

  return (
    <div className="white-block pattern-block">
      <div className={`pattern-block__head pattern-block__head--${tagsArr.pop()}`}>
        <b>{titleVal.length > 25 ? titleVal.substr(0, 25) + '...' : titleVal}</b>
        <Tooltip title={descriptionVal} animation="shift" theme="light" arrow={true}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 11c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
            <path d="M8 6.85c-.28 0-.5.22-.5.5v3.4c0 .28.22.5.5.5s.5-.22.5-.5v-3.4c0-.27-.22-.5-.5-.5zM8.01 4.8c-.26-.02-.5.25-.51.52v.08c0 .27.21.47.49.48H8c.27 0 .49-.24.5-.5v-.11c0-.29-.21-.47-.49-.47z" />
          </svg>
        </Tooltip>
      </div>
      <div className="pattern-block__content">
        <div className="pattern-block__pattern-input">
          <input className="gray-input" type="text" value={pattern} readOnly />
        </div>
        <div className="pattern-block__pattern-test">
          {inputValue && <PatternStatus type={isCorret ? 'success' : 'error'} />}
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder={placeholder}
            value={inputValue}
          />
        </div>
        {tags && (
          <div className="pattern-block__pattern-bottom">
            <ul className="pattern-block__pattern-tags">
              {tagsArr.slice(0, 3).map((v, i) => (
                <Link key={v + '-' + i} to={`/tags/${v}`}>
                  <li>{v}</li>
                </Link>
              ))}
            </ul>
          </div>
        )}
        {inputValue && matches && (
          <ul className="pattern-block__pattern-tags pattern-block__pattern-tags--matches">
            {matches
              .sort((a, b) => a.length - b.length)
              .map((match, index) => {
                return <li key={match + '-' + index}>{match}</li>;
              })}
          </ul>
        )}
      </div>
    </div>
  );
};
