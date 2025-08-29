import { create } from "zustand";
import { RawMovie, TransformedMovie } from "../types/Movie";
import { config } from "../../config/env";

type SearchState = {
  query: string;
  setQuery: (value: string) => void;
  searchList: TransformedMovie[];
  setSearchList: (searchList: RawMovie[]) => void;
};

const useSearchKeywordStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (value: string) => set({ query: value }),
  searchList: [],
  setSearchList: (searchList) =>
    set(() => ({
      searchList: searchList.map((movie, index) => ({
        ...movie,
        id: movie.id,
        rank: index + 1,
        image: `${config.tmdbImageUrl}${movie.poster_path}`,
        title: movie.title,
        description: movie.overview,
      })),
    })),
}));

export default useSearchKeywordStore;
