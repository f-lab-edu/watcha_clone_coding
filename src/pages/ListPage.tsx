import useMovieList from "../hooks/useMovieList";
import Slider from "../components/Slider";

import "../styles/Page.css";

const ListPage = () => {
  const { movieList, isLoading, error } = useMovieList();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <section className="theme-tab">
        <ul className="tab-list">
          <li className="tab-item tab-item-active">
            <button>추천</button>
          </li>
          <li className="tab-item">
            <button>#완전한 발견</button>
          </li>
          <li className="tab-item">
            <button>#한국</button>
          </li>
          <li className="tab-item">
            <button>#애니메이션</button>
          </li>
          <li className="tab-item">
            <button>성인+</button>
          </li>
        </ul>
      </section>
      {/* 메인 슬라이드 */}
      <section style={{ marginBottom: "40px" }}>
        <Slider slides={movieList} height="642px" articleWidth={1140} layout="overlay" />
      </section>
      {/* 추천1 */}
      <section style={{ marginBottom: "40px" }}>
        <Slider slides={movieList} height="289px" articleWidth={421} layout="top" />
      </section>
      <section style={{ marginBottom: "40px" }}>
        <h2>개별 구매 Top 20</h2>
        <Slider slides={movieList} height="200px" articleWidth={400} layout="left" />
      </section>
      <section style={{ marginBottom: "40px" }}>
        <h2>새로 올라온 콘텐츠</h2>
        <Slider slides={movieList} height="164px" articleWidth={290} layout="none" />
      </section>
    </div>
  );
};

export default ListPage;
