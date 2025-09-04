import { MovieData } from "@/types/Movie";
import { instance } from "./axios";
import { transformMovieList, transformMovieData } from "@/utils/transform";

export const fetchPopularMovieList = async () => {
  const response = await instance.get("/movie/popular?language=ko-KR&page=1");
  return transformMovieList(response.data.results);
};

export const fetchTopRatedMovieList = async () => {
  const response = await instance.get("/movie/top_rated?language=ko-KR&page=1");
  return transformMovieList(response.data.results);
};

export const fetchNowPlayingMovieList = async () => {
  const response = await instance.get("/movie/now_playing?language=ko-KR&page=1");
  return transformMovieList(response.data.results);
};

export const fetchMovieDetail = async (movieId: string) => {
  const response = await instance.get(
    `/movie/${movieId}?append_to_response=credits,videos,belongs_to_collection&language=ko-KR`,
  );
  return transformMovieData(response.data) as MovieData;
};

export const fetchMovieReviews = async (movieId: string) => {
  const response = await instance.get(`/movie/${movieId}/reviews?language=en-US&page=1`);
  return response.data;
};

export const fetchTodayTrendingMovie = async () => {
  const response = await instance.get("/trending/movie/day?language=ko-KR");
  return response.data;
};

export const fetchMovieGenres = async () => {
  const response = await instance.get("/genre/movie/list?language=ko");
  return response.data;
};

export const fetchSearchKeywords = async (query: string) => {
  const response = await instance.get(`/search/movie?query=${query}&include_adult=false&language=ko-KR&page=1`);
  return response.data;
};

export const fetchSearchGenres = async (genreId: string) => {
  const response = await instance.get(`/discover/movie?with_genres=${genreId}&page=1&language=ko-KR`);
  return response.data;
};
