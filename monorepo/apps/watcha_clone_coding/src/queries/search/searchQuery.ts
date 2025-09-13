import {  useSuspenseQuery } from "@tanstack/react-query";
import { searchListKeys } from "./queryKeys";
import { fetchSearchKeywords, fetchSearchGenres } from "@/utils/api";

export const searchMovieQuery = (keyword: string) => {
  return useSuspenseQuery({
    queryKey: searchListKeys.searchMovie(keyword),
    queryFn: () => fetchSearchKeywords(keyword),
  });
};

export const searchGenresQuery = (genreId: string) => {
  return useSuspenseQuery({
    queryKey: searchListKeys.searchGenres(genreId),
    queryFn: () => fetchSearchGenres(genreId),
  });
};
