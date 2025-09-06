import { useEffect, type FormEvent, type KeyboardEvent } from "react";
import { useLocation } from "react-router-dom";
import useSearchKeywordStore from "@/stores/useSearchKeywordStore";

const useSearchMovie = () => {
  const location = useLocation();
  const { query, setQuery, genreId, setGenreId } = useSearchKeywordStore();

  // 검색 페이지에서 벗어날 때 초기화
  useEffect(() => {
    const currentPath = location.pathname;

    // 검색 페이지가 아닐 때 초기화
    if (currentPath !== "/search") {
      setQuery("");
      setGenreId("");
    }
  }, [location.pathname]);

  const handleSubmit = (e?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setQuery(trimmed); // 검색 실행
    setGenreId(""); // 장르 검색 초기화
  };

  const searchByGenre = (genreId: string) => {
    setGenreId(genreId);
    setQuery(""); // 키워드 검색 초기화
  };

  return {
    query,
    setQuery,
    handleSubmit,
    searchByGenre,
    genreId,
  };
};

export default useSearchMovie;
