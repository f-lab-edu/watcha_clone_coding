import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { movieDetailQuery } from "@/queries/detail/movieDetailQuery";

const useMovieDetail = () => {
  dayjs.extend(duration);
  let params = useParams();

  // URL에서 movieId 추출
  const movieId = params.id;

  // movieId가 없으면 에러 처리
  if (!movieId) {
    console.error("Movie ID가 URL에서 찾을 수 없습니다.");
    return {
      movieData: null,
      reviews: [],
      getReleaseYear: () => 0,
      changeTimeFormat: () => "",
    };
  }

  try {
    const { detailQuery, reviewsQuery } = movieDetailQuery(movieId);

    const getReleaseYear = (date: string): number => {
      if (!date) return 0;
      const newDay = dayjs(date);
      return newDay.year();
    };

    const changeTimeFormat = (time: number): string => {
      if (!time) return "0분";
      const formattedTime = dayjs.duration(time, "minute").format("HH시간 mm분");
      return formattedTime;
    };

    return {
      movieData: detailQuery.data,
      reviews: reviewsQuery.data || [],
      getReleaseYear,
      changeTimeFormat,
    };
  } catch (error) {
    console.error("영화 상세 정보를 가져오는 중 오류 발생:", error);
    return {
      movieData: null,
      reviews: [],
      getReleaseYear: () => 0,
      changeTimeFormat: () => "",
    };
  }
};

export default useMovieDetail;
