import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useRouter } from 'next/router';

import { useMovieDetailQuery } from '@/queries/detail/useMovieDetailQuery';

const useMovieDetail = () => {
  dayjs.extend(duration);
  // URL에서 movieId 추출
  const {
    query: { id },
  } = useRouter();
  const movieId = typeof id === 'string' ? id : '';

  // Hook은 항상 호출되어야 하므로, movieId가 없어도 호출
  const { detailQuery, reviewsQuery } = useMovieDetailQuery(movieId);

  const getReleaseYear = (date: string): number => {
    if (!date) return 0;
    const newDay = dayjs(date);
    return newDay.year();
  };

  const changeTimeFormat = (time: number): string => {
    if (!time) return '0분';
    const formattedTime = dayjs.duration(time, 'minute').format('HH시간 mm분');
    return formattedTime;
  };

  // movieId가 없으면 에러 처리
  if (!movieId) {
    console.error('Movie ID가 URL에서 찾을 수 없습니다.');
    return {
      movieData: null,
      reviews: [],
      getReleaseYear,
      changeTimeFormat,
    };
  }

  return {
    movieData: detailQuery.data,
    reviews: reviewsQuery.data || [],
    getReleaseYear,
    changeTimeFormat,
  };
};

export default useMovieDetail;
