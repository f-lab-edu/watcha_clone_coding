import Carousel from "../components/Carousel";
import Button from "../components/Button";

import "../styles/Page.css";

const ListPage = () => {
  return (
    <div>
      <section className="theme-tab">
        <ul className="tab-list">
          <li className="tab-item tab-item-active">
            <Button value={"추천"} />
          </li>
          <li className="tab-item">
            <Button value={"#완전한 발견"} />
          </li>
          <li className="tab-item">
            <Button value={"#한국"} />
          </li>
          <li className="tab-item">
            <Button value={"#애니메이션"} />
          </li>
          <li className="tab-item">
            <Button value={"성인+"} />
          </li>
        </ul>
      </section>
      {/* 메인 슬라이드 */}
      <section style={{ marginBottom: "40px" }}>
        <Carousel height={642} articleWidth={1140} layout="overlay" />
      </section>
      {/* 추천1 */}
      <section style={{ marginBottom: "40px" }}>
        <Carousel height={289} articleWidth={421} layout="top" />
      </section>
      <section style={{ marginBottom: "40px" }}>
        <h2>개별 구매 Top 20</h2>
        <Carousel height={200} articleWidth={400} layout="left" />
      </section>
      <section style={{ marginBottom: "40px" }}>
        <h2>새로 올라온 콘텐츠</h2>
        <Carousel height={164} articleWidth={290} layout="none" />
      </section>
    </div>
  );
};

export default ListPage;
