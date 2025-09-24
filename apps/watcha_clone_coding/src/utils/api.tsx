import { instance } from './axios';

import { transformMovieList, transformMovieData } from '@/utils/transform';

const movieListQueryString = new URLSearchParams({
  language: 'ko-KR',
  page: '1',
});

export const fetchPopularMovieList = () =>
  instance.get(`/movie/popular?${movieListQueryString}`).then((response) => transformMovieList(response.data.results));

export const fetchTopRatedMovieList = () =>
  instance
    .get(`/movie/top_rated?${movieListQueryString}`)
    .then((response) => transformMovieList(response.data.results));

export const fetchNowPlayingMovieList = () =>
  instance
    .get(`/movie/now_playing?${movieListQueryString}`)
    .then((response) => transformMovieList(response.data.results));

const movieDetailQueryString = new URLSearchParams({
  language: 'ko-KR',
  append_to_response: 'credits,videos,belongs_to_collection',
});

export const fetchMovieDetail = (movieId: string) =>
  instance.get(`/movie/${movieId}?${movieDetailQueryString}`).then((response) => {
    if (!response.data || !response.data.id) {
      throw new Error(`영화 ID ${movieId}에 대한 데이터를 찾을 수 없습니다.`);
    }
    return transformMovieData(response.data);
  });

const movieReviewsQueryString = new URLSearchParams({
  language: 'en-US',
  page: '1',
});

export const fetchMovieReviews = (movieId: string) =>
  instance
    .get(`/movie/${movieId}/reviews?${movieReviewsQueryString}`)
    .then((response) => response.data || { results: [] });

const movieTrendingQueryString = new URLSearchParams({
  language: 'ko-KR',
});

export const fetchTodayTrendingMovie = () =>
  instance.get(`/trending/movie/day?${movieTrendingQueryString}`).then((response) => response.data.results);

const movieGenresQueryString = new URLSearchParams({
  language: 'ko',
});

export const fetchMovieGenres = () =>
  instance.get(`/genre/movie/list?${movieGenresQueryString}`).then((response) => response.data.genres);

export const fetchSearchKeywords = (query: string) =>
  instance
    .get(`/search/movie?query=${query}&include_adult=false&${movieListQueryString}`)
    .then((response) => transformMovieList(response.data.results, { usePoster: true }));

export const fetchSearchGenres = (genreId: string) =>
  instance
    .get(`/discover/movie?with_genres=${genreId}&${movieListQueryString}`)
    .then((response) => transformMovieList(response.data.results, { usePoster: true }));
