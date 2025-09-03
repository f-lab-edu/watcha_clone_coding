import { Link } from "react-router-dom";
import { config } from "@/../config/env";
import Carousel from "@/components/Carousel";
import useSearchMovies from "@/hooks/useSearchMovies";
import ThemeTab from "@/components/ThemeTab";
import useSearchMovie from "@/hooks/useSearchMovie";
import { Genre } from "@/types/Movie";
import GenresCard from "@/components/GenresCard";
import "@/styles/Search.css";

const TAB_BUTTONS = [
  {
    name: "전체",
  },
  {
    name: "액션",
  },
  {
    name: "로맨스",
  },
  {
    name: "코미디",
  },
  {
    name: "다른 장르 보기 V",
  },
];

const SearchPage = () => {
  const { trendingList, genresList, highlightedIndex, handleMouseEnter, isLoading, isError } = useSearchMovies();
  const { searchList, searchQuery, isLoading: isSearchLoading, genreId } = useSearchMovie();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러: {isError}</div>;

  // 검색 중일 때
  if (isSearchLoading) {
    return <div>검색 중...</div>;
  }

  // 검색 결과가 있을 때 (키워드 검색 또는 장르 검색)
  if (searchList.length > 0) {
    return (
      <div>
        {genreId && <ThemeTab list={genresList} />}
        <section className="search-result">
          <ul>
            {searchList.map((movie) => (
              <li className="search-result-item" key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <img src={`${config.tmdbImageUrl}${movie.image}`} alt={movie.title} />
                  <div>{movie.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  // 검색을 했지만 결과가 없을 때
  if (searchQuery && searchList.length === 0) {
    return <div>검색하신 작품이 현재 왓챠에 없어요.</div>;
  }

  return (
    <div>
      <section className="popular-keyword">
        <div className="popular-keyword-container">
          <h2>인기 검색어 TOP 10</h2>
          <div className="popular-keyword-content">
            <div className="popular-keyword-list">
              <ThemeTab list={TAB_BUTTONS} />
              <ul className="trending-list">
                {trendingList.slice(0, 10).map((movie, index) => (
                  <li
                    key={movie.id}
                    className={`trending-item ${index === highlightedIndex ? "highlighted" : ""}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <Link to={`/movie/${movie.id}`}>
                      <span className="trending-rank">{index + 1}</span>
                      <span className="trending-title">{movie.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="background-img">
              {trendingList[highlightedIndex] && (
                <img
                  src={`${config.tmdbImageUrl}${trendingList[highlightedIndex].backdrop_path}`}
                  alt={trendingList[highlightedIndex].title}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="category-type">
        <div className="category-container">
          <h2>장르</h2>
          <Carousel.Root height={180} articleWidth={319} slides={genresList}>
            <Carousel.LeftButton />
            <Carousel.Track articleWidth={319}>
              <Carousel.Article articleWidth={319} layout="overlay">
                {(slide) => {
                  return <GenresCard slide={slide as Genre} layout="overlay" type="genres" />;
                }}
              </Carousel.Article>
            </Carousel.Track>
            <Carousel.RightButton />
          </Carousel.Root>
        </div>
        <div className="category-container">
          <h2>장르</h2>
          <Carousel.Root height={180} articleWidth={319} slides={genresList}>
            <Carousel.LeftButton />
            <Carousel.Track articleWidth={319}>
              <Carousel.Article articleWidth={319} layout="overlay">
                {(slide) => {
                  return <GenresCard slide={slide as Genre} layout="overlay" type="genres" />;
                }}
              </Carousel.Article>
            </Carousel.Track>
            <Carousel.RightButton />
          </Carousel.Root>
        </div>
        <div className="category-container">
          <h2>장르</h2>
          <Carousel.Root height={180} articleWidth={319} slides={genresList}>
            <Carousel.LeftButton />
            <Carousel.Track articleWidth={319}>
              <Carousel.Article articleWidth={319} layout="overlay">
                {(slide) => {
                  return <GenresCard slide={slide as Genre} layout="overlay" type="genres" />;
                }}
              </Carousel.Article>
            </Carousel.Track>
            <Carousel.RightButton />
          </Carousel.Root>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
