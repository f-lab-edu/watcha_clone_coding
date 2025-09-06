export const searchListKeys = {
  all: ["search"] as const,
  trending: () => [...searchListKeys.all, "trending"] as const,
  genres: () => [...searchListKeys.all, "genres"] as const,
  search: () => [...searchListKeys.all, "search"] as const,
  searchGenres: (id: string) => [...searchListKeys.search(), "genres", id] as const,
  searchMovie: (keyword: string) => [...searchListKeys.search(), "movie", keyword] as const,
};
