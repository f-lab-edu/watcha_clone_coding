// config/env.ts
export const config = {
  tmdbApiKey: process.env.REACT_APP_TMDB_API_KEY,
  tmdbBaseUrl: process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  tmdbImageUrl: process.env.REACT_APP_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p/w500',
};

// 환경변수 검증
if (!config.tmdbApiKey) {
  throw new Error('REACT_APP_TMDB_API_KEY가 설정되지 않았습니다.');
}
