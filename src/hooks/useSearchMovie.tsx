import { useState, useEffect, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import useSearchKeywordStore from "@/stores/useSearchKeywordStore";
import { fetchSearchKeywords, fetchSearchGenres } from "@/utils/api";

const useSearchMovie = () => {
  const location = useLocation();
  const { query, setQuery, genreId, setGenreId, reset, searchList, setSearchList } = useSearchKeywordStore();
  const [searchQuery, setSearchQuery] = useState("");

  const searchMovieQuery = useQuery({
    queryKey: ["searchMovie", searchQuery],
    queryFn: () => fetchSearchKeywords(searchQuery),
    enabled: Boolean(searchQuery && searchQuery.trim().length > 0),
  });

  const searchGenresQuery = useQuery({
    queryKey: ["searchGenres", genreId],
    queryFn: () => fetchSearchGenres(genreId),
    enabled: Boolean(genreId),
  });

  // 검색 페이지에서 벗어날 때 초기화
  useEffect(() => {
    const currentPath = location.pathname;

    // 검색 페이지가 아닐 때 초기화
    if (currentPath !== "/search") {
      reset();
      setSearchQuery("");
      setGenreId("");
    }
  }, [location.pathname, reset]);

  useEffect(() => {
    if (searchMovieQuery.data?.results) {
      setSearchList(searchMovieQuery.data.results);
    }
  }, [searchMovieQuery.data, setSearchList]);

  useEffect(() => {
    if (searchGenresQuery.data?.results) {
      setSearchList(searchGenresQuery.data.results);
    }
  }, [searchGenresQuery.data, setSearchList]);

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setSearchQuery(trimmed);
    setGenreId(""); // 장르 검색 초기화
  };

  const searchByGenre = (genreId: string) => {
    setGenreId(genreId);
    setSearchQuery(""); // 키워드 검색 초기화
  };

  return {
    query,
    setQuery,
    reset,
    handleSubmit,
    searchByGenre,
    isLoading: searchMovieQuery.isLoading || searchGenresQuery.isLoading,
    isError: searchMovieQuery.isError || searchGenresQuery.isError,
    searchList,
    searchQuery,
    genreId,
  };
};

export default useSearchMovie;
