import { useQuery } from "@tanstack/react-query";
import { fetchMovieGenres, fetchTodayTrendingMovie } from "../utils/api";
import { useEffect } from "react";
import useMovieSearchStore from "../stores/useMovieSearchStore";

const useSearchMovies = () => {
  const { trendingList, genresList, setTrendingList, setGenresList } = useMovieSearchStore();
  const movieTrandingQuery = useQuery({
    queryKey: ["search"],
    queryFn: () => fetchTodayTrendingMovie(),
  });

  useEffect(() => {
    if (movieTrandingQuery.data) {
      setTrendingList(movieTrandingQuery.data.results);
    }
  });

  const movieGenresQuery = useQuery({
    queryKey: ["search"],
    queryFn: () => fetchMovieGenres(),
  });

  useEffect(() => {
    if (movieGenresQuery.data) {
      setGenresList(movieGenresQuery.data.results);
    }
  });

  return {
    trendingList,
    genresList,
  };
};

export default useSearchMovies;
