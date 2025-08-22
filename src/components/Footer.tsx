import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      {/* 서비스 이용약관 및 정책 */}
      <ul className="footer-terms text-base text-small">
        <li className="footer-terms-item">왓챠피디아 서비스 이용 약관</li>
        <li className="footer-terms-item">개인정보 처리 방침</li>
        <li className="footer-terms-item">왓챠 서비스 이용 약관</li>
        <li className="footer-terms-item">청소년 보호정책</li>
        <li className="footer-terms-item">고객센터</li>
        <li className="footer-terms-item">채용정보</li>
      </ul>

      {/* 고객센터 및 연락처 정보 */}
      <ul className="footer-contact">
        <li className="footer-contact-item text-base text-medium">
          <span className="footer-contact-label">고객센터(이용 및 결제 문의)</span>
          <a href="mailto:cs@watcha.co.kr" className="footer-contact-link">
            cs@watcha.co.kr
          </a>
        </li>

        <li className="footer-contact-item text-base text-medium">
          <span className="footer-contact-label">광고 문의</span>
          <a href="mailto:ad-sales@watcha.com" className="footer-contact-link">
            ad-sales@watcha.com
          </a>
          <span className="footer-contact-link">02-515-9985 (유료)</span>
        </li>

        <li className="footer-contact-item text-base text-medium">
          <span className="footer-contact-label">제휴 및 대외 협력</span>
          <a
            href="https://watcha.team/contact"
            className="footer-contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://watcha.team/contact
          </a>
          <a href="#" className="footer-contact-link">
            최신 광고 소개서
          </a>
        </li>

        <li className="footer-contact-item text-base text-medium">
          <span className="footer-contact-label">B2B 구독권 구매 문의</span>
          <a href="mailto:jinu1005@coopnc.com" className="footer-contact-link">
            쿠프마케팅 (jinu1005@coopnc.com)
          </a>
        </li>

        <li className="footer-contact-item text-base text-medium">
          <span className="footer-contact-label">큐레이터</span>
          <a href="#" className="footer-contact-link">
            큐레이터 이용 가이드
          </a>
        </li>
      </ul>

      {/* 회사 정보 */}
      <div className="footer-company">
        <ul className="footer-company-list text-base text-medium">
          <li className="footer-company-item divider-element">주식회사 왓챠</li>
          <li className="footer-company-item divider-element">대표 박태훈</li>
          <li className="footer-company-item">서울특별시 서초구 강남대로 343 신덕빌딩 3층</li>
        </ul>

        <ul className="footer-company-list text-base text-medium">
          <li className="footer-company-item divider-element">사업자등록번호 211-88-66013</li>
          <li className="footer-company-item">통신판매업 신고번호 제 2019-서울서초-0965호</li>
        </ul>

        <ul className="footer-company-list text-base text-medium">
          <li className="footer-company-item">호스팅 서비스 제공자 아마존웹서비시즈코리아 유한회사</li>
        </ul>
      </div>

      {/* SNS 링크 */}
      <div className="footer-social">
        <a href="#" className="footer-social-link interactive-element" aria-label="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
            <g fill="none" fillRule="evenodd">
              <path d="M0 0h48v48H0z"></path>
              <path
                fill="currentColor"
                fillRule="nonzero"
                d="M32.5 12.44h-4.18c-.82 0-2.66.16-2.66 3.34v4.08h6.84l-1.14 6.31h-5.7V42.5H19.2V26.17h-5.7v-6.3h5.7v-5.58s-.22-7.79 7.98-7.79h5.32z"
              />
            </g>
          </svg>
        </a>

        <a href="#" className="footer-social-link interactive-element" aria-label="Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
            <path
              fill="currentColor"
              d="M22.3 18.79 29.39 11H27.7l-6.14 6.76-4.9-6.76H11l7.42 10.23L11 29.4h1.68l6.48-7.15 5.18 7.15H30zm-2.29 2.53-.75-1.02-5.98-8.1h2.57l4.83 6.54.75 1.01 6.28 8.5h-2.58z"
            />
          </svg>
        </a>

        <a href="#" className="footer-social-link interactive-element" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
            <g fill="none" fillRule="evenodd">
              <path d="M0 0h48v48H0z"></path>
              <path
                fill="currentColor"
                fillRule="nonzero"
                d="M36.19 40H11.81C9.71 40 8 38.3 8 36.19V11.81C8 9.71 9.7 8 11.81 8h24.38C38.29 8 40 9.7 40 11.81v24.38c0 2.1-1.7 3.81-3.81 3.81M24 17.8a6.2 6.2 0 1 0 0 12.39 6.2 6.2 0 0 0 0-12.4m12.42-4.63c0-.84-.75-1.59-1.59-1.59h-2.99c-.84 0-1.62.75-1.62 1.59v2.99c0 .84.78 1.62 1.62 1.62h3c.83 0 1.58-.78 1.58-1.62zm0 8.55h-2.8a9.9 9.9 0 1 1-19.23 0h-2.81v13.11c0 .84.75 1.59 1.59 1.59h21.66c.84 0 1.59-.75 1.59-1.59z"
              />
            </g>
          </svg>
        </a>

        <a href="#" className="footer-social-link interactive-element" aria-label="Blog">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
            <g fill="none" fillRule="evenodd">
              <path d="M0 0h48v48H0z"></path>
              <path
                fill="currentColor"
                fillRule="nonzero"
                d="M24 6a18 18 0 1 0 0 36 18 18 0 0 0 0-36m3.51 15c0-1.07-.78-2-2.03-2H21v4h4.48c1.25 0 2.03-.88 2.03-2m-1.87 5H21v4h4.64c1.38 0 2.21-.75 2.21-2 0-1.1-.78-2-2.21-2m.93 7H17V16h9.29c3.3 0 5 1.96 5 4.28 0 2.15-1.36 3.56-3 3.9a4.1 4.1 0 0 1 3.33 4.18c0 2.62-1.72 4.64-5.05 4.64"
              />
            </g>
          </svg>
        </a>
      </div>

      {/* 저작권 정보 */}
      <div className="footer-copyright text-base text-medium">Copyright © 2025 by Watcha_clone_coding</div>
    </footer>
  );
};

export default Footer;
