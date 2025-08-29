import { useNavigate } from "react-router-dom";
import { useState, useEffect, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { config } from "../../config/env";
import useSearchKeywordStore from "../stores/useSearchKeywordStore";
import { fetchKeywords } from "../utils/api";

const useSearchMovie = () => {
  const { query, setQuery, searchList, setSearchList } = useSearchKeywordStore();
  const [searchQuery, setSearchQuery] = useState("");

  const searchMovieQuery = useQuery({
    queryKey: ["searchMovie", searchQuery],
    queryFn: () => fetchKeywords(searchQuery),
    enabled: Boolean(searchQuery && searchQuery.trim().length > 0),
  });

  useEffect(() => {
    if (searchMovieQuery.data?.results) {
      setSearchList(searchMovieQuery.data.results);
    }
  }, [searchMovieQuery.data, setSearchList]);

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setSearchQuery(trimmed);
  };

  const reset = () => {
    setQuery("");
    setSearchList([]);
  };

  return {
    query,
    setQuery,
    reset,
    handleSubmit,
    isLoading: searchMovieQuery.isLoading,
    isError: searchMovieQuery.isError,
    searchList,
    searchQuery,
  };
};

export default useSearchMovie;
