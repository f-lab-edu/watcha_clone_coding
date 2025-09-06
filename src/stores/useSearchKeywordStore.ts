import { create } from "zustand";
import { RawMovie, TransformedMovie } from "@/types/Movie";
import { transformMovieList } from "@/utils/transform";

type SearchState = {
  query: string;
  setQuery: (value: string) => void;
  genreId: string;
  setGenreId: (value: string) => void;
};

const useSearchKeywordStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (value: string) => set({ query: value }),
  genreId: "",
  setGenreId: (value: string) => set({ genreId: value }),
}));

export default useSearchKeywordStore;
