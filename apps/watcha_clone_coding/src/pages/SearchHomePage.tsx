import { Carousel } from 'carousel';
import React from 'react';
import { Link } from 'react-router-dom';

import AppErrorBoundary from '@/components/AppErrorBoundary';
import GenresCard from '@/components/GenresCard';
import { SearchHomePageSkeleton } from '@/components/Skeleton';
import ThemeTab from '@/components/ThemeTab';
import useSearchMovies from '@/hooks/useSearchMovies';
import { useSearchListQuery } from '@/queries/search/useSearchListQuery';
import { Genre } from '@/types/Movie';
import { buildImageUrl } from '@/utils/transform';
import '@/styles/Search.css';

const TAB_BUTTONS = [
  {
    name: '전체',
  },
  {
    name: '액션',
  },
  {
    name: '로맨스',
  },
  {
    name: '코미디',
  },
  {
    name: '다른 장르 보기 V',
  },
];

const SearchHomePageContent = () => {
  const { highlightedIndex, handleMouseEnter } = useSearchMovies();
  const { trendingQuery, genresQuery } = useSearchListQuery();

  return (
    <div>
      <section className="popular-keyword">
        <div className="popular-keyword-container">
          <h2>인기 검색어 TOP 10</h2>
          <div className="popular-keyword-content">
            <div className="popular-keyword-list">
              <ThemeTab list={TAB_BUTTONS} />
              <ul className="trending-list">
                {trendingQuery.data?.slice(0, 10).map((movie: any, index: number) => (
                  <li
                    key={movie.id}
                    className={`trending-item ${index === highlightedIndex ? 'highlighted' : ''}`}
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
              {trendingQuery.data?.[highlightedIndex] && (
                <img
                  src={buildImageUrl(trendingQuery.data[highlightedIndex].backdrop_path)}
                  alt={trendingQuery.data[highlightedIndex].title}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="category-type">
        <div className="category-container">
          <div className="category-header">
            <h2>장르별 영화</h2>
            <p className="category-description">원하는 장르를 선택해서 영화를 탐색해보세요</p>
          </div>
          <Carousel.Root height={180} articleWidth={319} slides={genresQuery.data ?? []}>
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

const SearchHomePage = () => {
  return (
    <AppErrorBoundary>
      <React.Suspense fallback={<SearchHomePageSkeleton />}>
        <SearchHomePageContent />
      </React.Suspense>
    </AppErrorBoundary>
  );
};

export default SearchHomePage;
