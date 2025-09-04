import { fetchNowPlayingMovieList, fetchPopularMovieList, fetchTopRatedMovieList } from "@/utils/api";
import { useQueries } from "@tanstack/react-query";
import { movieListKeys } from "./queryKeys";

export const movieListQuery = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: movieListKeys.popular(),
        queryFn: fetchPopularMovieList,
      },
      {
        queryKey: movieListKeys.top_rated(),
        queryFn: fetchTopRatedMovieList,
      },
      {
        queryKey: movieListKeys.now_playing(),
        queryFn: fetchNowPlayingMovieList,
      },
    ],
  });

  const [popularQuery, topRatedQuery, nowPlayingQuery] = results;
  const isLoading = results.some((q) => q.isLoading || q.isPending);
  const isError = results.some((q) => q.isError);
  const error = results.find((q) => q.error)?.error ?? null;
  const isSuccess = results.every((q) => q.isSuccess);

  return { popularQuery, topRatedQuery, nowPlayingQuery, isLoading, isError, isSuccess, error };
};
