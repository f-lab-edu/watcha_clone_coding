import { Link, useLocation } from "react-router-dom";
import Button from "@/components/Button";
import useSearchMovie from "@/hooks/useSearchMovie";

import Watcha from "@/assets/watcha.svg";
import Search from "@/assets/search.svg";
import Alarm from "@/assets/alarm.svg";

const Header = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const { query, setQuery, handleKeyDown } = useSearchMovie();

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-nav-content">
          <Link to="/" className="header-logo">
            <Watcha />
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
          {pathName !== "/search" ? (
            <Link to={"/search"}>
              <Button
                className="header-search-button button-base interactive-element"
                aria-label="검색"
                icon={<Search />}
              >
                <span className="text-base text-large">영화 검색</span>
              </Button>
            </Link>
          ) : (
            <div className="header-search-button button-base interactive-element">
              <Search />
              <input
                ref={(node) => {
                  if (pathName === "/search" && node) {
                    node.focus();
                  }
                }}
                className="search-input"
                placeholder="영화 검색"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleKeyDown(e);
                  }
                }}
                name="query"
              />
              {query ? (
                <Button className="search-reset" aria-label="검색어 지우기" onClick={() => setQuery("")}></Button>
              ) : null}
            </div>
          )}
          <Button
            className="header-notification-button button-base interactive-element"
            aria-label="알림"
            icon={<Alarm />}
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
