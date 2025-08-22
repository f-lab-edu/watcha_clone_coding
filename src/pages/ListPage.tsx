import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { config } from "../config/env";
import "../styles/Page.css";

const ListPage = () => {
  const [sliderData, setSliderData] = useState([]);

  const getDate = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${config.tmdbApiKey}`,
        },
      };

      const response = await fetch(`${config.tmdbBaseUrl}/movie/popular?language=ko-KR&page=1`, options);
      const data = await response.json();

      setSliderData(
        data.results.map((item: any, index: number) => ({
          id: item.id,
          rank: index + 1,
          image: config.tmdbImageUrl + item.backdrop_path,
          title: item.title,
          description: item.overview,
        })),
      );
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
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
