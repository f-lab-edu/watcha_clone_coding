import { useEffect } from "react";
import useMovieListStore from "../stores/useMovieListStore";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieList } from "../utils/api";

const useMovieList = () => {
  const { movieList, setMovieList } = useMovieListStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["movieList"],
    queryFn: fetchMovieList,
  });

  useEffect(() => {
    if (data) {
      setMovieList(data.results);
    }
  }, [data, setMovieList]);

  return { movieList, isLoading, error };
};

export default useMovieList;
