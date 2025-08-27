// useMovieListStore.tsx
import { create } from "zustand";
import { TransformedMovie, RawMovie } from "../types/Movie";
import { config } from "../../config/env";

interface MovieListState {
  movieLists: {
    popular: TransformedMovie[];
    top20: TransformedMovie[];
    now: TransformedMovie[];
  };
  setMovies: (category: "popular" | "top20" | "now", movies: RawMovie[]) => void;
  getMoviesByCategory: (category: "popular" | "top20" | "now") => TransformedMovie[];
}

const transformMovie = (movie: RawMovie, index: number): TransformedMovie => ({
  id: movie.id,
  rank: index + 1,
  image: `${config.tmdbImageUrl}${movie.backdrop_path}`,
  title: movie.title,
  description: movie.overview,
});

const useMovieListStore = create<MovieListState>((set, get) => ({
  movieLists: {
    popular: [],
    top20: [],
    now: [],
  },
  setMovies: (category, movies) =>
    set((state) => ({
      movieLists: {
        ...state.movieLists,
        [category]: movies.map((movie, index) => ({
          ...movie,
          id: movie.id,
          rank: index + 1,
          image: `${config.tmdbImageUrl}${movie.backdrop_path}`,
          title: movie.title,
          description: movie.overview,
        })),
      },
    })),
  getMoviesByCategory: (category) => {
    return get().movieLists[category] || [];
  },
}));

export default useMovieListStore;
