import { config } from "../../config/env";

export const fetchPopularMovieList = async () => {
  const response = await fetch(`${config.tmdbBaseUrl}/movie/popular?language=ko-KR&page=1`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.tmdbApiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("영화 목록을 가져오는데 실패했습니다.");
  }

  return response.json();
};

export const fetchTopRatedMovieList = async () => {
  const response = await fetch(`${config.tmdbBaseUrl}/movie/top_rated?language=ko-KR&page=1`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.tmdbApiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("영화 목록을 가져오는데 실패했습니다.");
  }

  return response.json();
};

export const fetchNowPlayingMovieList = async () => {
  const response = await fetch(`${config.tmdbBaseUrl}/movie/now_playing?language=ko-KR&page=1`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.tmdbApiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("영화 목록을 가져오는데 실패했습니다.");
  }

  return response.json();
};

export const fetchMovieDetail = async (movieId: string) => {
  const response = await fetch(
    `${config.tmdbBaseUrl}/movie/${movieId}?append_to_response=credits,videos,belongs_to_collection&language=ko-KR`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${config.tmdbApiKey}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("영화 정보를 가져오는데 실패했습니다.");
  }

  return response.json();
};

export const fetchMovieReviews = async (movieId: string) => {
  const response = await fetch(`${config.tmdbBaseUrl}/movie/${movieId}/reviews?language=en-US&page=1`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.tmdbApiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("영화 리뷰를 가져오는데 실패했습니다.");
  }

  return response.json();
};

export const fetchTodayTrendingMovie = async () => {
  const response = await fetch(`${config.tmdbBaseUrl}/trending/movie/day?language=ko-KR`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.tmdbApiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("오늘의 인기 영화를 가져오는데 실패했습니다.");
  }

  return response.json();
};

export const fetchMovieGenres = async () => {
  const response = await fetch(`${config.tmdbBaseUrl}/genre/movie/list?language=ko`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.tmdbApiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("영화 장르 목록을 가져오는데 실패했습니다.");
  }

  return response.json();
};

export const fetchSearchKeywords = async (query: string) => {
  const response = await fetch(
    `${config.tmdbBaseUrl}/search/movie?query=${query}&include_adult=false&language=ko-KR&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${config.tmdbApiKey}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("영화 검색 결과를 가져오는데 실패했습니다.");
  }

  return response.json();
};

export const fetchSearchGenres = async (genreId: string) => {
  const response = await fetch(`${config.tmdbBaseUrl}/discover/movie?with_genres=${genreId}&page=1&language=ko-KR`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.tmdbApiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("영화 검색 결과를 가져오는데 실패했습니다.");
  }

  return response.json();
};
