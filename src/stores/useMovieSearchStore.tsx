import { create } from "zustand";
import { RawMovie, Genre } from "@/types/Movie";

interface MovieSearchState {
  trendingList: RawMovie[];
  genresList: Genre[];
  setTrendingList: (trendingList: RawMovie[]) => void;
  setGenresList: (genresList: Genre[]) => void;
}

const useMovieSearchStore = create<MovieSearchState>((set) => ({
  trendingList: [],
  genresList: [],
  setTrendingList: (trend) =>
    set((state) => ({
      trendingList: trend,
    })),
  setGenresList: (genres) =>
    set((state) => ({
      genresList: genres,
    })),
}));

export default useMovieSearchStore;
