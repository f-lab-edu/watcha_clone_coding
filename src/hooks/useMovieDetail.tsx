import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { config } from "@/../config/env";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail, fetchMovieReviews } from "@/utils/api";
import useMovieDetailStore from "@/stores/useMovieDetailStore";
import { MovieData } from "@/types/Movie";

const useMovieDetail = () => {
  let params = useParams();
  const { movieDetail, reviews, setMovieDetail, setReviews } = useMovieDetailStore();

  const transformMovieData = (response: any): MovieData => {
    const director = response.credits.crew.find((member: any) => member.job === "Director") || null;

    return {
      title: response.title,
      releaseDate: response.release_date,
      runtime: response.runtime,
      voteAverage: response.vote_average,
      voteCount: response.vote_count,
      overview: response.overview,
      backdrop: response.backdrop_path,
      genres: response.genres,
      collection: response.belongs_to_collection,
      videos: response.videos.results,
      member: director ? [director, ...response.credits.cast] : response.credits.cast,
    };
  };

  // URL에서 movieId 추출
  const movieId = params.id!;

  const movieDetailQuery = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieDetail(movieId),
  });

  const reviewsQuery = useQuery({
    queryKey: ["reviews", movieId],
    queryFn: () => fetchMovieReviews(movieId),
  });

  useEffect(() => {
    if (movieDetailQuery.data) {
      setMovieDetail(transformMovieData(movieDetailQuery.data));
    }
  }, [movieDetailQuery.data, setMovieDetail]);

  useEffect(() => {
    if (reviewsQuery.data) {
      setReviews(reviewsQuery.data.results);
    }
  }, [reviewsQuery.data, setReviews]);

  const getReleaseYear = (date: string): number => {
    return new Date(date).getFullYear();
  };

  const changeTimeFormat = (time: number): string => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}시간 ${minutes}분`;
  };

  const getImageUrl = (path: string | null): string => {
    if (!path) return "";
    return `${config.tmdbImageUrl}${path}`;
  };

  return {
    movieData: movieDetail,
    reviews: reviews,
    isLoading: movieDetailQuery.isLoading || reviewsQuery.isLoading,
    error: movieDetailQuery.error || reviewsQuery.error,
    getReleaseYear,
    changeTimeFormat,
    getImageUrl,
  };
};

export default useMovieDetail;
