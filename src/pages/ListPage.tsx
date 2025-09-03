import Carousel from "@/components/Carousel";
import MovieCard from "@/components/MovieCard";

import ThemeTab from "@/components/ThemeTab";
import useMovieList from "@/hooks/useMovieList";
import useMovieListStore from "@/stores/useMovieListStore";
import "@/styles/Page.css";
import { CarouselProps } from "@/types/Carousel";

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
        {/* <Carousel height={642} articleWidth={1140} layout="overlay" slides={getMoviesByCategory("popular")} /> */}
        <Carousel.Root height={642} articleWidth={1140} slides={getMoviesByCategory("popular")}>
          <Carousel.LeftButton />
          <Carousel.Track articleWidth={1140}>
            <Carousel.Article articleWidth={1140} layout="overlay">
              {(slide) => {
                return <MovieCard slide={slide as CarouselProps} layout="overlay" type="movie" />;
              }}
            </Carousel.Article>
          </Carousel.Track>
          <Carousel.RightButton />
        </Carousel.Root>
      </section>
      {/* 추천1 */}
      <section style={{ marginBottom: "40px" }}>
        <Carousel.Root height={289} articleWidth={421} slides={getMoviesByCategory("popular")}>
          <Carousel.LeftButton />
          <Carousel.Track articleWidth={421}>
            <Carousel.Article articleWidth={421} layout="top">
              {(slide) => {
                return <MovieCard slide={slide as CarouselProps} layout="top" type="movie" />;
              }}
            </Carousel.Article>
          </Carousel.Track>
          <Carousel.RightButton />
        </Carousel.Root>
      </section>
      <section style={{ marginBottom: "40px" }}>
        <h2>개별 구매 Top 20</h2>
        <Carousel.Root height={200} articleWidth={400} slides={getMoviesByCategory("top20")}>
          <Carousel.LeftButton />
          <Carousel.Track articleWidth={400}>
            <Carousel.Article articleWidth={400} layout="left">
              {(slide) => {
                return <MovieCard slide={slide as CarouselProps} layout="left" type="movie" />;
              }}
            </Carousel.Article>
          </Carousel.Track>
          <Carousel.RightButton />
        </Carousel.Root>
      </section>
      <section style={{ marginBottom: "40px" }}>
        <h2>새로 올라온 콘텐츠</h2>
        <Carousel.Root height={164} articleWidth={290} slides={getMoviesByCategory("now")}>
          <Carousel.LeftButton />
          <Carousel.Track articleWidth={290}>
            <Carousel.Article articleWidth={290} layout="none">
              {(slide) => {
                return <MovieCard slide={slide as CarouselProps} layout="none" type="movie" />;
              }}
            </Carousel.Article>
          </Carousel.Track>
          <Carousel.RightButton />
        </Carousel.Root>
      </section>
    </div>
  );
};

export default ListPage;
