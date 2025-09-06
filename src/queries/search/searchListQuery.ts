import { useQueries } from "@tanstack/react-query";
import { searchListKeys } from "./queryKeys";
import { fetchMovieGenres, fetchSearchKeywords, fetchTodayTrendingMovie } from "@/utils/api";

export const searchListQuery = () => {
  const results = useQueries({
    queries: [
      { queryKey: searchListKeys.trending(), queryFn: fetchTodayTrendingMovie },
      {
        queryKey: searchListKeys.genres(),
        queryFn: fetchMovieGenres,
      },
    ],
  });

  const [trendingQuery, genresQuery] = results;
  const isLoading = results.some((q) => q.isLoading || q.isPending);
  const isError = results.some((q) => q.isError);
  const error = results.find((q) => q.error)?.error ?? null;
  const isSuccess = results.every((q) => q.isSuccess);

  return { trendingQuery, genresQuery, isLoading, isError, isSuccess, error };
};
