import { create } from "zustand";
import { RawMovie, TransformedMovie } from "@/types/Movie";
import { transformMovieList } from "@/utils/transform";

type SearchState = {
  query: string;
  setQuery: (value: string) => void;
  genreId: string;
  setGenreId: (value: string) => void;
  searchList: TransformedMovie[];
  setSearchList: (searchList: RawMovie[]) => void;
  reset: () => void;
};

const useSearchKeywordStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (value: string) => set({ query: value }),
  genreId: "",
  setGenreId: (value: string) => set({ genreId: value }),
  searchList: [],
  setSearchList: (searchList) => set(() => ({ searchList: transformMovieList(searchList, { usePoster: true }) })),
  reset: () =>
    set({
      query: "",
      searchList: [],
    }),
}));

export default useSearchKeywordStore;
