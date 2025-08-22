import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-nav-content">
          <Link to="/" className="header-logo">
            <svg width="196" height="59" viewBox="0 0 196 59" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M78.2713 12.9184V20.771H86.0946V56.1956H95.8432V20.771H103.218V12.9184H78.2713ZM153.464 29.6389H146.004V12.9763H136.285V56.2532H146.004V37.4912H153.464V56.2532H163.183V12.9763H153.464V29.6389ZM119.613 12.4527H117.92C109.142 12.4527 105.631 16.9316 105.631 24.203V44.8521C105.631 52.1239 109.142 56.777 118.108 56.777H119.801C128.704 56.777 131.839 51.4252 131.839 45.3763V37.9891H122.309V44.8521C122.309 47.4123 121.431 48.9826 118.923 48.9826C116.477 48.9826 115.663 47.5286 115.663 44.7946V24.1446C115.663 21.4105 116.477 20.015 118.923 20.015C121.493 20.015 122.309 21.5269 122.309 24.1446V29.147H131.839V23.621C131.839 16.4087 128.453 12.4527 119.613 12.4527ZM68.782 41.4224L65.9558 23.3316H64.2841L61.4576 41.4224H68.782ZM72.3262 12.9184L79.9759 56.1956H71.0902L70.009 49.2753H60.2308L59.1493 56.1956H50.2636L57.9136 12.9184H72.3262ZM184.391 41.4224L181.564 23.3316H179.893L177.066 41.4224H184.391ZM187.935 12.9184L195.585 56.1956H186.699L185.618 49.2753H175.84L174.759 56.1956H165.873L173.522 12.9184H187.935Z"
                fill="#FF0558"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M42.2501 0.757812L39.3521 42.2067L38.5733 42.2466L31.6807 12.9224H23.164L18.0078 43.3072L16.9027 43.3639L12.2862 12.9224H0.414062L11.2151 58.2397L23.2891 57.4557L27.2173 29.3268L28.3694 29.2653L33.6295 56.7761L45.1855 56.0206L54.3625 0.757812H42.2501Z"
                fill="#FF0558"
              />
            </svg>
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
          <button className="header-search-button button-base interactive-element" aria-label="검색">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.17 16.43a7.5 7.5 0 1 1 .26-.26 1 1 0 0 0-.26.26m.64 1.44a9 9 0 1 1 1.06-1.06l3.88 3.88a.75.75 0 1 1-1.06 1.06z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-base text-large"></span>
          </button>

          <button className="header-notification-button button-base interactive-element" aria-label="알림">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M19.87 9c.13 1 .26 2.5.26 2.5l.25 3.35q.02.15.09.29l1.45 2.76c.26.5-.1 1.1-.67 1.1H16.4a4.4 4.4 0 0 1-4.4 3.75A4.4 4.4 0 0 1 7.61 19H2.76a.75.75 0 0 1-.67-1.1l1.45-2.76q.08-.15.08-.3l.26-3.34S4 10 4.14 9C4.65 5.27 8.07 2 12 2s7.39 3.27 7.87 7M9.13 19A2.9 2.9 0 0 0 12 21.25c1.46 0 2.63-1 2.88-2.25zm-3.76-7.4v.02l-.25 3.34q-.03.46-.25.87L4 17.5H20l-.87-1.67a2 2 0 0 1-.25-.87l-.25-3.34v-.05l-.02-.18-.24-2.2A6.7 6.7 0 0 0 12 3.5c-3.13 0-5.96 2.66-6.38 5.7a43 43 0 0 0-.24 2.36z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button className="header-login-button button-base interactive-element text-base text-regular">
            로그인/회원가입
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
