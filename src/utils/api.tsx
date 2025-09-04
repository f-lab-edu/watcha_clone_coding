import { MovieData, RawMovie, TransformedMovie } from "@/types/Movie";
import { instance } from "./axios";
import { config } from "@/../config/env";

const transformMovie = (movie: RawMovie, index: number): TransformedMovie => ({
  id: movie.id,
  rank: index + 1,
  image: `${config.tmdbImageUrl}${movie.backdrop_path}`,
  title: movie.title,
  description: movie.overview,
});

export const fetchPopularMovieList = async () => {
  const response = await instance.get("/movie/popular?language=ko-KR&page=1");
  return response.data.results.map(transformMovie);
};

export const fetchTopRatedMovieList = async () => {
  const response = await instance.get("/movie/top_rated?language=ko-KR&page=1");
  return response.data.results.map(transformMovie);
};

export const fetchNowPlayingMovieList = async () => {
  const response = await instance.get("/movie/now_playing?language=ko-KR&page=1");
  return response.data.results.map(transformMovie);
};

const transformMovieData = (response: any): MovieData => {
  const director = response.credits.crew.find((member: any) => member.job === "Director") || null;

  return {
    title: response.title,
    releaseDate: response.release_date,
    runtime: response.runtime,
    voteAverage: response.vote_average,
    voteCount: response.vote_count,
    overview: response.overview,
    backdrop: response.backdrop_path,
    genres: response.genres,
    collection: response.belongs_to_collection,
    videos: response.videos.results,
    member: director ? [director, ...response.credits.cast] : response.credits.cast,
  };
};

export const fetchMovieDetail = async (movieId: string) => {
  const response = await instance.get(
    `/movie/${movieId}?append_to_response=credits,videos,belongs_to_collection&language=ko-KR`,
  );
  return response.data.results.map(transformMovieData);
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
