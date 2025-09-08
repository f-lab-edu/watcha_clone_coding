import {  useSuspenseQueries } from "@tanstack/react-query"
import { movieDetailKeys } from "./queryKeys"
import { fetchMovieDetail, fetchMovieReviews } from "@/utils/api"

export const movieDetailQuery = (movidId: string) => {
    const results = useSuspenseQueries({
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

  return {  detailQuery,  reviewsQuery };
}