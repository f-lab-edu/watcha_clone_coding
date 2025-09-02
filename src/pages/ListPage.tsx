import Carousel from "@/components/Carousel";

import ThemeTab from "@/components/ThemeTab";
import useMovieList from "@/hooks/useMovieList";
import useMovieListStore from "@/stores/useMovieListStore";
import "@/styles/Page.css";

const TAB_BUTTONS = [
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

const ListPage = () => {
  const { isLoading, error } = useMovieList();
  const { getMoviesByCategory } = useMovieListStore();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <ThemeTab list={TAB_BUTTONS} />
      {/* 메인 슬라이드 */}
      <section style={{ marginBottom: "40px" }}>
        <Carousel height={642} articleWidth={1140} layout="overlay" slides={getMoviesByCategory("popular")} />
      </section>
      {/* 추천1 */}
      <section style={{ marginBottom: "40px" }}>
        <Carousel height={289} articleWidth={421} layout="top" slides={getMoviesByCategory("popular")} />
      </section>
      <section style={{ marginBottom: "40px" }}>
        <h2>개별 구매 Top 20</h2>
        <Carousel height={200} articleWidth={400} layout="left" slides={getMoviesByCategory("top20")} />
      </section>
      <section style={{ marginBottom: "40px" }}>
        <h2>새로 올라온 콘텐츠</h2>
        <Carousel height={164} articleWidth={290} layout="none" slides={getMoviesByCategory("now")} />
      </section>
    </div>
  );
};

export default ListPage;
