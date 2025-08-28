import Carousel from "../components/Carousel";
import Button from "../components/Button";

import "../styles/Page.css";
import ThemeTab from "../components/ThemeTab";

const ListPage = () => {
  const tabButtons = [
    {
      name: "추천",
    },
    {
      name: "#완전한 발견",
    },
    {
      name: "#한국",
    },
    {
      name: "#애니메이션",
    },
    {
      name: "성인+",
    },
  ];
  return (
    <div>
      <ThemeTab list={tabButtons} />
      {/* 메인 슬라이드 */}
      <section style={{ marginBottom: "40px" }}>
        <Carousel height={642} articleWidth={1140} layout="overlay" category="popular" />
      </section>
      {/* 추천1 */}
      <section style={{ marginBottom: "40px" }}>
        <Carousel height={289} articleWidth={421} layout="top" category="popular" />
      </section>
      <section style={{ marginBottom: "40px" }}>
        <h2>개별 구매 Top 20</h2>
        <Carousel height={200} articleWidth={400} layout="left" category="top20" />
      </section>
      <section style={{ marginBottom: "40px" }}>
        <h2>새로 올라온 콘텐츠</h2>
        <Carousel height={164} articleWidth={290} layout="none" category="now" />
      </section>
    </div>
  );
};

export default ListPage;
