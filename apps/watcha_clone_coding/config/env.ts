// config/env.ts
export const config = {
  tmdbApiKey: import.meta.env.VITE_TMDB_API_KEY,
  tmdbBaseUrl: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  tmdbImageUrl: import.meta.env.VITE_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p/w500',
};

// 환경변수 검증 (개발 환경에서만)
if (import.meta.env.DEV && !config.tmdbApiKey) {
  console.warn('VITE_TMDB_API_KEY가 설정되지 않았습니다. 개발 환경에서는 API 호출이 제한될 수 있습니다.');
}

// 프로덕션 환경에서는 API 키가 반드시 필요
if (import.meta.env.PROD && !config.tmdbApiKey) {
  throw new Error('VITE_TMDB_API_KEY가 설정되지 않았습니다. 프로덕션 배포를 위해 API 키를 설정해주세요.');
}
