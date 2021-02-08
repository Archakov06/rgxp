import React from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../context';
import { clearFilters, setSearchValue } from '../store/actions';

export const Header: React.FC = () => {
  const { dispatch, searchValue } = React.useContext(StateContext);

  const handleClickLogo = (): void => {
    if (dispatch) {
      dispatch(clearFilters());
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (dispatch) {
      dispatch(setSearchValue(e.target.value));
    }
  };

  return (
    <>
      <Link to="/">
        <svg
          onClick={handleClickLogo}
          id="logo"
          xmlns="http://www.w3.org/2000/svg"
          width="126"
          height="26"
          viewBox="0 0 126 26">
          <g strokeWidth="1" fill="none">
            <g fill="#383838">
              <path d="M5.6 16L8.9 16 12.1 25 18.1 25 13.8 15C16.4 13.8 17.2 11.5 17.2 8.5 17.2 3.9 15.1 1 8.6 1L0.5 1 0.5 25 5.6 25 5.6 16ZM5.6 5.7L9.1 5.7C11.4 5.7 11.6 7.2 11.6 8.5 11.6 9.8 11.4 11.4 9.1 11.4L5.6 11.4 5.6 5.7ZM29.8 25.4C33.3 25.4 36.1 24.7 37.5 23.8L37.5 11.1 29 11.1 29 15.7 32.4 15.7 32.4 20.6C32.1 20.6 31.4 20.6 30.9 20.6 26.5 20.6 24.9 19 24.9 13 24.9 7.4 26.4 5.4 30.9 5.4 32.9 5.4 35.1 5.8 37 6.7L37 1.7C35.6 1 33.2 0.6 30 0.6 22.7 0.6 19.7 4.6 19.7 13 19.7 21.4 22.7 25.4 29.8 25.4L29.8 25.4ZM53.9 25L59.9 25 53.3 12.5 59.5 1 53.6 1 49.7 9.6 45.8 1 39.9 1 46.1 12.5 39.5 25 45.5 25 49.7 16.4 53.9 25ZM67.2 16.7L70.2 16.7C76.6 16.7 78.8 13 78.8 8.8 78.8 4.7 76.6 1 70.2 1L62 1 62 25 67.2 25 67.2 16.7ZM67.2 5.7L70.2 5.7C72.8 5.7 73.2 7.6 73.2 8.9 73.2 10.1 72.8 12.1 70.2 12.1L67.2 12.1 67.2 5.7ZM79.9 22.4C79.9 24.1 81.2 25.4 83 25.4 84.7 25.4 86 24.1 86 22.4 86 20.7 84.7 19.4 83 19.4 81.2 19.4 79.9 20.7 79.9 22.4L79.9 22.4ZM93.4 16L96.7 16 99.9 25 105.9 25 101.7 15C104.2 13.8 105 11.5 105 8.5 105 3.9 102.9 1 96.4 1L88.3 1 88.3 25 93.4 25 93.4 16ZM93.4 5.7L96.9 5.7C99.2 5.7 99.4 7.2 99.4 8.5 99.4 9.8 99.2 11.4 96.9 11.4L93.4 11.4 93.4 5.7ZM116.4 25.4C120.1 25.4 125.3 24 125.3 17.4L125.3 1 120.2 1 120.2 17.2C120.2 20.3 118.2 20.8 116.4 20.8 114.6 20.8 112.6 20.3 112.6 17.2L112.6 1 107.5 1 107.5 17.4C107.5 24 112.8 25.4 116.4 25.4L116.4 25.4Z" />
            </g>
          </g>
        </svg>
      </Link>
      <div className="white-block menu-block">
        <ul className="menu-block__items">
          <Link to="/tags/email" className="menu-block__item menu-block__item--email">
            <li>
              <span>Почта</span>
            </li>
          </Link>
          <Link to="/tags/numbers" className="menu-block__item menu-block__item--email">
            <li>
              <span>Цифры</span>
            </li>
          </Link>
          <Link to="/tags/strings" className="menu-block__item menu-block__item--email">
            <li>
              <span>Строки</span>
            </li>
          </Link>
          <Link to="/tags/date" className="menu-block__item menu-block__item--email">
            <li>
              <span>Дата/Время</span>
            </li>
          </Link>
          <Link to="/tags/uri" className="menu-block__item menu-block__item--email">
            <li>
              <span>Uri</span>
            </li>
          </Link>
          <li className="menu-block__item menu-block__item--other">
            <span>Другое</span>
            <ul>
              <Link to="/tags/html">
                <li>
                  <span>HTML</span>
                </li>
              </Link>
              <Link to="/tags/css">
                <li>
                  <span>CSS</span>
                </li>
              </Link>
              <Link to="/tags/phone">
                <li>
                  <span>Adress / Phone</span>
                </li>
              </Link>
              <Link to="/tags/code">
                <li>
                  <span>Markup / Code</span>
                </li>
              </Link>
            </ul>
          </li>
          <li className="menu-block__item menu-block__item--search">
            <input
              onChange={handleChangeInput}
              id="search-input"
              type="text"
              placeholder="Поиск..."
              value={searchValue}
            />
          </li>
        </ul>
      </div>
    </>
  );
};
