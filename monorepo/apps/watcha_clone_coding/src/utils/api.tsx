import { instance } from "./axios";
import { transformMovieList, transformMovieData } from "@/utils/transform";

export const fetchPopularMovieList = () => 
  instance
    .get("/movie/popular?language=ko-KR&page=1")
    .then((response) => transformMovieList(response.data.results));

export const fetchTopRatedMovieList = () => 
  instance
    .get("/movie/top_rated?language=ko-KR&page=1")
    .then((response) => transformMovieList(response.data.results));

export const fetchNowPlayingMovieList = () => 
  instance
    .get("/movie/now_playing?language=ko-KR&page=1")
    .then((response) => transformMovieList(response.data.results));

export const fetchMovieDetail = (movieId: string) => 
  instance
    .get(`/movie/${movieId}?append_to_response=credits,videos,belongs_to_collection&language=ko-KR`)
    .then((response) => {
      if (!response.data || !response.data.id) {
        throw new Error(`영화 ID ${movieId}에 대한 데이터를 찾을 수 없습니다.`);
      }
      return transformMovieData(response.data);
    })
    .catch((error) => {
      console.error(`영화 상세 정보 가져오기 실패 (ID: ${movieId}):`, error);
      throw error;
    });

export const fetchMovieReviews = (movieId: string) => 
  instance
    .get(`/movie/${movieId}/reviews?language=en-US&page=1`)
    .then((response) => response.data || { results: [] })
    .catch((error) => {
      console.error(`영화 리뷰 가져오기 실패 (ID: ${movieId}):`, error);
      return { results: [] }; // 리뷰는 필수가 아니므로 빈 배열 반환
    });

export const fetchTodayTrendingMovie = () => 
  instance
    .get("/trending/movie/day?language=ko-KR")
    .then((response) => response.data.results);

export const fetchMovieGenres = () => 
  instance
    .get("/genre/movie/list?language=ko")
    .then((response) => response.data.genres);


export const fetchSearchKeywords = (query: string) => 
  instance
    .get(`/search/movie?query=${query}&include_adult=false&language=ko-KR&page=1`)
    .then((response) => transformMovieList(response.data.results, { usePoster: true }));


export const fetchSearchGenres = (genreId: string) => 
  instance
    .get(`/discover/movie?with_genres=${genreId}&page=1&language=ko-KR`)
    .then((response) => transformMovieList(response.data.results, { usePoster: true }));

