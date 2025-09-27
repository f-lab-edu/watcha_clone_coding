import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from '@/components/Button';
import AlarmIcon from '@/components/icons/AlarmIcon';
import SearchIcon from '@/components/icons/SearchIcon';
import WatchaIcon from '@/components/icons/WatchaIcon';
import useSearchMovie from '@/hooks/useSearchMovie';

const Header = (): React.ReactElement => {
  const location = useLocation();
  const pathName = location.pathname;
  const { query, setQuery, handleEnterKeyDown } = useSearchMovie();

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-nav-content">
          <Link to="/" className="header-logo">
            <WatchaIcon />
          </Link>

          <div className="header-nav-menu">
            <ul className="header-nav-list">
              <li className="header-nav-item">
                <a className="header-nav-link text-base text-xl" href="#">
                  <span className="header-nav-link-content">구독</span>
                </a>
              </li>
              <li className="header-nav-item">
                <a className="header-nav-link header-nav-link--active text-base text-xl" href="#">
                  <span className="header-nav-link-content">개별 구매</span>
                </a>
              </li>
              <li className="header-nav-item">
                <a className="header-nav-link text-base text-xl" href="#">
                  <span className="header-nav-link-content">웹툰</span>
                </a>
              </li>
              <li className="header-nav-item">
                <a className="header-nav-link text-base text-xl" href="#">
                  <span className="header-nav-link-content">왓챠 파티</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="header-actions">
          {pathName !== '/search' ? (
            <Link to={'/search'}>
              <Button
                className="header-search-button button-base interactive-element"
                aria-label="검색"
                icon={<SearchIcon />}
              >
                <span className="text-base text-large">영화 검색</span>
              </Button>
            </Link>
          ) : (
            <div className="header-search-button button-base interactive-element">
              <SearchIcon />
              <input
                ref={(node) => {
                  if (pathName === '/search' && node) {
                    node.focus();
                  }
                }}
                className="search-input"
                placeholder="영화 검색"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEnterKeyDown(e);
                  }
                }}
                name="query"
              />
              {query ? (
                <Button className="search-reset" aria-label="검색어 지우기" onClick={() => setQuery('')}></Button>
              ) : null}
            </div>
          )}
          <Button
            className="header-notification-button button-base interactive-element"
            aria-label="알림"
            icon={<AlarmIcon />}
          ></Button>
          <Button className="header-login-button button-base interactive-element text-base text-regular">
            로그인/회원가입
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
