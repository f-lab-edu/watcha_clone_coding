import { useQueries } from "@tanstack/react-query"
import { movieDetailKeys } from "./queryKeys"
import { fetchMovieDetail, fetchMovieReviews } from "@/utils/api"

export const movieDetailQuery = (movidId: string) => {
    const results = useQueries({
        queries: [
            {
                queryKey: movieDetailKeys.detail(movidId),
                queryFn: () => fetchMovieDetail(movidId),
            },
            {
                queryKey: movieDetailKeys.reviews(movidId),
                queryFn: () => fetchMovieReviews(movidId),
            }
        ]
    })
    const [detailQuery, reviewsQuery] = results;
  const isLoading = results.some((q) => q.isLoading || q.isPending);
  const isError = results.some((q) => q.isError);
  const error = results.find((q) => q.error)?.error ?? null;
  const isSuccess = results.every((q) => q.isSuccess);

  return {  detailQuery,  reviewsQuery, isLoading, isError, isSuccess, error };
}