import { useSuspenseQueries } from "@tanstack/react-query"
import { movieDetailKeys } from "./queryKeys"
import { fetchMovieDetail, fetchMovieReviews } from "@/utils/api"

export const useMovieDetailQuery = (movieId: string) => {
    const results = useSuspenseQueries({
        queries: [
            {
                queryKey: movieDetailKeys.detail(movieId),
                queryFn: () => fetchMovieDetail(movieId),
                retry: 2,
                retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            },
            {
                queryKey: movieDetailKeys.reviews(movieId),
                queryFn: () => fetchMovieReviews(movieId),
                retry: 1,
                retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            }
        ]
    })
    const [detailQuery, reviewsQuery] = results;

  return { detailQuery, reviewsQuery };
}