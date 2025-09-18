import axios from 'axios';
import { config as apiConfig } from '@/../config/env';

// Axios 인스턴스 생성
export const instance = axios.create({
  baseURL: apiConfig.tmdbBaseUrl,
  timeout: 5000, // 타임아웃을 5초로 단축
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Encoding': 'gzip, deflate, br', // 압축 지원
  },
  // 브라우저 환경에서는 Keep-Alive가 자동으로 처리됨
});

instance.interceptors.request.use(
  // 요청이 전달되기 전에 쿼리 파라미터에 API 키 추가
  (config) => {
    const newConfig = { ...config };
    // TMDB API는 api_key 쿼리 파라미터를 사용
    if (newConfig.params) {
      newConfig.params.api_key = apiConfig.tmdbApiKey;
    } else {
      newConfig.params = { api_key: apiConfig.tmdbApiKey };
    }
    return newConfig;
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response?.status;
    if (statusCode === 401) {
      console.error('인증 오류: API 키가 유효하지 않습니다.');
    }
    return Promise.reject(error);
  },
);
