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
    throw new Error("Failed to fetch movies");
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
    throw new Error("Failed to fetch movies");
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
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};
