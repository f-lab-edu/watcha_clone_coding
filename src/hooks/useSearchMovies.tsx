import { useQuery } from "@tanstack/react-query";
import { fetchMovieGenres, fetchTodayTrendingMovie } from "../utils/api";
import { useEffect, useState } from "react";
import useMovieSearchStore from "../stores/useMovieSearchStore";

const useSearchMovies = () => {
  const { trendingList, genresList, setTrendingList, setGenresList } = useMovieSearchStore();

  const movieTrandingQuery = useQuery({
    queryKey: ["trending-movies"],
    queryFn: () => fetchTodayTrendingMovie(),
  });

  useEffect(() => {
    if (movieTrandingQuery.data) {
      setTrendingList(movieTrandingQuery.data.results);
    }
  }, [movieTrandingQuery.data, setTrendingList]);

  const movieGenresQuery = useQuery({
    queryKey: ["movie-genres"],
    queryFn: () => fetchMovieGenres(),
  });

  useEffect(() => {
    if (movieGenresQuery.data) {
      setGenresList(movieGenresQuery.data.genres);
    }
  }, [movieGenresQuery.data, setGenresList]);

  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((prevIndex) => (prevIndex === 9 ? 0 : prevIndex + 1));
    }, 2000); // 2초마다 다음 아이템으로

    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  return {
    trendingList,
    genresList,
    highlightedIndex,
    handleMouseEnter,
    isLoading: movieTrandingQuery.isLoading || movieGenresQuery.isLoading,
    isError: movieTrandingQuery.isError || movieGenresQuery.isError,
  };
};

export default useSearchMovies;
