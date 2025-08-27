// useMovieListStore.tsx
import { create } from "zustand";
import { config } from "../../config/env";
import { TransformedMovie, RawMovie } from "../types/Movie";

interface MovieListState {
  movieList: TransformedMovie[];
  setMovieList: (movieList: RawMovie[]) => void;
}

const useMovieListStore = create<MovieListState>((set) => ({
  movieList: [],
  setMovieList: (rawMovies) =>
    set(() => ({
      movieList: rawMovies.map((movie, index) => ({
        ...movie,
        id: movie.id,
        rank: index + 1,
        image: `${config.tmdbImageUrl}${movie.backdrop_path}`,
        title: movie.title,
        description: movie.overview,
      })),
    })),
}));

export default useMovieListStore;
