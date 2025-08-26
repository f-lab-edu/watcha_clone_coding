import { config } from "../../config/env";

export const fetchMovieList = async () => {
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
