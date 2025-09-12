import React from "react";
import { Link } from "react-router-dom";
import ThemeTab from "@/components/ThemeTab";
import Status from "@/components/Status";
import useSearchMovie from "@/hooks/useSearchMovie";
import { searchListQuery } from "@/queries/search/searchListQuery";
import { searchGenresQuery, searchMovieQuery } from "@/queries/search/searchQuery";
import { buildImageUrl } from "@/utils/transform";
import { TransformedMovie, Genre } from "@/types/Movie";
import AppErrorBoundary from "@/components/AppErrorBoundary";
import "@/styles/Search.css";

const SearchResultPageContent = () => {
  const { query, genreId } = useSearchMovie();
  const { genresQuery } = searchListQuery();
  const { data: keywordData} = searchMovieQuery(query);
  const { data: genresData } = searchGenresQuery(genreId);


  const resultList = (resultData: TransformedMovie[], type: string) => {
    return (
      <div>
        {/* 장르 검색일 때만 장르 탭 표시 */}
        {type === "genres" && genresQuery.data.length > 0 && (
          <div className="genre-filter-section">
            <h3>장르별 필터</h3>
            <ThemeTab list={genresQuery.data} />
          </div>
        )}

        {/* 검색 결과 헤더 */}
        <div className="search-result-header">
          <h2>
            {type === "keyword"
              ? `"${query}" 검색 결과`
              : `장르: ${
                  genresQuery.data.find((g: { name: string; id?: number }) => g.id?.toString() === genreId)?.name
                }`}
          </h2>
          <span className="result-count">{resultData.length}개 작품</span>
        </div>

        <section className="search-result">
          <ul>
            {resultData.map((movie) => (
              <li className="search-result-item" key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <img src={buildImageUrl(movie.image)} alt={movie.title} />
                  <div className="movie-info">
                    <span>{movie.title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  };

  const emptyList = () => {
    return (
      <div className="empty-result">
        <h3>검색 결과가 없습니다.</h3>
        <p>검색하신 작품이 현재 왓챠에 없어요.</p>
        <p>다른 키워드로 검색해보세요.</p>
      </div>
    );
  };

  if (query) {
    if (keywordData && keywordData.length > 0) {
      return resultList(keywordData, "keyword");
    } else {
      return emptyList();
    }
  } else if (genreId) {
    if (genresData && genresData.length > 0) {
      return resultList(genresData, "genres");
    } else {
      return emptyList();
    }
  }

  return <Status.Loading />;
};


const SearchResultPage = () => {
  return (
    <AppErrorBoundary>
      <React.Suspense fallback={<Status.SearchResultPageLoading />}>
        <SearchResultPageContent />
      </React.Suspense>
    </AppErrorBoundary>
  );
};

export default SearchResultPage;
