import React from 'react';

interface PatternStatusProps {
  type?: 'success' | 'error';
}

export const PatternStatus: React.FC<PatternStatusProps> = ({ type }) => {
  if (!type) {
    return null;
  }

  return (
    <div className={`pattern-block__pattern-status pattern-block__pattern-status--${type}`}>
      {type === 'error' ? (
        <svg xmlns="http://www.w3.org/2000/svg" id="error-icon" viewBox="0 0 13 13">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="main-g" transform="translate(-424.000000, -357.000000)" fill="#FFFFFF">
              <g id="Group-5" transform="translate(86.000000, 222.000000)">
                <g id="Group-3" transform="translate(308.000000, 0.000000)">
                  <g id="Group" transform="translate(16.000000, 122.000000)">
                    <polygon
                      id="Shape"
                      points="27 14.3139286 25.6860714 13 20.5 18.1860714 15.3139286 13 14 14.3139286 19.1860714 19.5 14 24.6860714 15.3139286 26 20.5 20.8139286 25.6860714 26 27 24.6860714 21.8139286 19.5"></polygon>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M20 6L9 17l-5-5"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
};
