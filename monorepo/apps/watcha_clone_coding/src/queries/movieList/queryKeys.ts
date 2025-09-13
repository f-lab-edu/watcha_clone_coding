export const movieListKeys = {
  all: ["movies"] as const,
  popular: () => [...movieListKeys.all, "popular"] as const,
  top_rated: () => [...movieListKeys.all, "top_rated"] as const,
  now_playing: () => [...movieListKeys.all, "now_playing"] as const,
};
