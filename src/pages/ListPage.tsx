import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import "../styles/Page.css";

const ListPage = () => {
  const [sliderData, setSliderData] = useState([]);
  const getDate = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDQwZDgyNjkyODQyZDJkNGExNGU0ZjY0N2E5NDhlOSIsIm5iZiI6MTc1NTY1MTczMS45NzcsInN1YiI6IjY4YTUxZTkzNGFkYTEyY2IzZmQ1NDliZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tK4jtfTlU3u3RME7szR5e6TA-mhoWLhAP9sq_Ctu6pI",
      },
    };

    const url = "https://image.tmdb.org/t/p/w500";
    const response = fetch("https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1", options).then((res) =>
      res.json(),
    );
    const data = await response;
    setSliderData(
      data.results.map((item: any, index: number) => ({
        id: item.id,
        rank: index + 1,
        image: url + item.backdrop_path,
        title: item.title,
        description: item.overview,
      })),
    );
  };

  useEffect(() => {
    getDate();
  }, []);

  return (
    <>
      <div>
        <section className="theme-tab">
          <ul className="tab-list">
            <li className="tab-item tab-item-active">
              <button>추천</button>
            </li>
            <li className="tab-item">
              <button>#왓챠의 발견</button>
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
          <Slider slides={sliderData} height="642px" articleWidth={1140} layout="overlay" />
        </section>
        {/* 추천1 */}
        <section style={{ marginBottom: "40px" }}>
          <Slider slides={sliderData} height="289px" articleWidth={421} layout="top" />
        </section>
        <section style={{ marginBottom: "40px" }}>
          <h2>개별 구매 Top 20</h2>
          <Slider slides={sliderData} height="200px" articleWidth={400} layout="left" />
        </section>
        <section style={{ marginBottom: "40px" }}>
          <h2>새로 올라온 콘텐츠</h2>
          <Slider slides={sliderData} height="164px" articleWidth={290} layout="none" />
        </section>
      </div>
    </>
  );
};

export default ListPage;
