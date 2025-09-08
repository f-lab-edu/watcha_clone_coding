import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { movieDetailQuery } from "@/queries/detail/movieDetailQuery";

const useMovieDetail = () => {
  dayjs.extend(duration);
  let params = useParams();

  // URL에서 movieId 추출
  const movieId = params.id!;

  const  { detailQuery,  reviewsQuery} = movieDetailQuery(movieId)

  
  const getReleaseYear = (date: string): number => {
    const newDay = dayjs(date);
    return newDay.year();
  };

  const changeTimeFormat = (time: number): string => {
    const formattedTime = dayjs.duration(time, "minute").format("HH시간 mm분");
    return formattedTime;
  };

  return {
    movieData: detailQuery.data,
    reviews: reviewsQuery.data,
    getReleaseYear,
    changeTimeFormat,
  };
};

export default useMovieDetail;
