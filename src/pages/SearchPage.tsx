import { Link } from "react-router-dom";
import { config } from "../../config/env";
import Button from "../components/Button";
import Carousel from "../components/Carousel";
import useSearchMovies from "../hooks/useSearchMovies";
import "../styles/Search.css";
import ThemeTab from "../components/ThemeTab";

const SearchPage = () => {
  const { trendingList, genresList, highlightedIndex, handleMouseEnter } = useSearchMovies();

  const tabButtons = [
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

  return (
    <div>
      <section className="popular-keyword">
        <div className="popular-keyword-container">
          <h2>인기 검색어 TOP 10</h2>
          <div className="popular-keyword-content">
            <div className="popular-keyword-list">
              <ThemeTab list={tabButtons} />
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
          <Carousel height={180} articleWidth={319} layout="overlay" slides={genresList} />
        </div>
        <div className="category-container">
          <h2>장르</h2>
          <Carousel height={180} articleWidth={319} layout="overlay" slides={genresList} />
        </div>
        <div className="category-container">
          <h2>장르</h2>
          <Carousel height={180} articleWidth={319} layout="overlay" slides={genresList} />
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
