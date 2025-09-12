import { config } from "@/../config/env";
import { RawMovie, TransformedMovie, MovieData } from "@/types/Movie";

export const buildImageUrl = (path: string | null | undefined): string => {
  if (!path) return "";
  return `${config.tmdbImageUrl}${path}`;
};

export const transformMovieList = (movies: RawMovie[], options?: { usePoster?: boolean }): TransformedMovie[] => {
  const usePoster = options?.usePoster ?? false;
  return movies.map((movie, index) => ({
    id: movie.id,
    rank: index + 1,
    image: buildImageUrl(usePoster ? movie.poster_path : movie.backdrop_path),
    title: movie.title,
    description: movie.overview,
  }));
};

export const transformMovieData = (response: any): MovieData => {
  const director = response.credits?.crew?.find((member: any) => member.job === "Director") || null;

  return {
    id: response.id,
    title: response.title,
    releaseDate: response.release_date,
    runtime: response.runtime,
    voteAverage: response.vote_average,
    voteCount: response.vote_count,
    overview: response.overview,
    backdrop: response.backdrop_path,
    genres: response.genres,
    collection: response.belongs_to_collection,
    videos: response.videos?.results ?? [],
    member: director ? [director, ...(response.credits?.cast ?? [])] : response.credits?.cast ?? [],
  };
};
