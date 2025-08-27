import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNowPlayingMovieList, fetchPopularMovieList, fetchTopRatedMovieList } from "../utils/api";
import useMovieListStore from "../stores/useMovieListStore";

const useMovieList = () => {
  const { setMovies } = useMovieListStore();

  const popularQuery = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: fetchPopularMovieList,
  });

  const topRatedQuery = useQuery({
    queryKey: ["movies", "top_rated"],
    queryFn: fetchTopRatedMovieList,
  });

  const nowPlayingQuery = useQuery({
    queryKey: ["movies", "now_palying"],
    queryFn: fetchNowPlayingMovieList,
  });

  useEffect(() => {
    if (popularQuery.data) {
      setMovies("popular", popularQuery.data.results);
    }
  }, [popularQuery.data, setMovies]);

  useEffect(() => {
    if (topRatedQuery.data) {
      setMovies("top20", topRatedQuery.data.results);
    }
  }, [topRatedQuery.data, setMovies]);

  useEffect(() => {
    if (nowPlayingQuery.data) {
      setMovies("now", nowPlayingQuery.data.results);
    }
  }, [nowPlayingQuery.data, setMovies]);

  return {
    isLoading: popularQuery.isLoading || topRatedQuery.isLoading || nowPlayingQuery.isLoading,
    error: popularQuery.error || topRatedQuery.error || nowPlayingQuery.error,
    popularData: popularQuery.data,
    topRatedData: topRatedQuery.data,
    nowPlayingData: nowPlayingQuery.data,
    isPopularLoading: popularQuery.isLoading,
    isTopRatedLoading: topRatedQuery.isLoading,
    isNowPlayingLoading: nowPlayingQuery.isLoading,
  };
};

export default useMovieList;
