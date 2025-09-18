export const movieDetailKeys = {
  all: ['detail'] as const,
  detail: (movieId: string) => [...movieDetailKeys.all, 'detail', movieId] as const,
  reviews: (movieId: string) => [...movieDetailKeys.all, 'reviews', movieId] as const,
};
