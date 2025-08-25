import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { config } from "../../config/env";
import "../styles/Detail.css";

const DetailPage = () => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const fetchMovieData = async (movieId: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${config.tmdbApiKey}`,
        },
      };

      const response = await fetch(
        `${config.tmdbBaseUrl}/movie/${movieId}?append_to_response=credits,videos,reviews,belongs_to_collection&language=ko-KR`,
        options,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MovieDetailsResponse = await response.json();
      const transformedData = transformMovieData(data);

      console.log("원본 데이터:", data);
      console.log("변환된 데이터:", transformedData);

      setMovieData(transformedData);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const movieId = pathSegments[2];

    if (movieId) {
      fetchMovieData(movieId);
    }
  }, [location.pathname]);

  const getReleaseYear = (date: string): number => {
    return new Date(date).getFullYear();
  };

  const changeTimeFormat = (time: number): string => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}시간 ${minutes}분`;
  };

  const getImageUrl = (path: string | null): string => {
    if (!path) return "";
    return `${config.tmdbImageUrl}${path}`;
  };

  // 데이터가 없는 경우
  if (!movieData) {
    return (
      <div className="detail-page">
        <div className="no-data">데이터를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail">
        <div className="detail-header">
          <section className="detail-info-section">
            <div className="detail-info">
              <div className="detail-title">
                <h1>{movieData.title}</h1>
              </div>
              <div className="detail-release">
                <span>{getReleaseYear(movieData.releaseDate)}</span>
                {movieData.runtime && <span>{changeTimeFormat(movieData.runtime)}</span>}
                {movieData.genres.map((genre) => (
                  <span key={genre.id} className="detail-genre">
                    {genre.name}
                  </span>
                ))}
              </div>
              <div className="detail-overview">
                <p>{movieData.overview}</p>
              </div>
            </div>
            <div className="detail-rating">
              <div className="detail-vote-average">
                <span className="vote-average-value">{movieData.voteAverage.toFixed(1)}</span>
                <span className="vote-dest">평균 별점</span>
              </div>
              <div className="detail-vote-count">
                <span className="vote-count-value">{movieData.voteCount.toLocaleString()}</span>
                <span className="vote-dest">평가 수</span>
              </div>
            </div>
            <div className="get-my-list">
              <div className="purchase-section">
                <button className="purchase-button">구매하기</button>
                <button className="gift-button">선물하기</button>
              </div>
              <div className="evaluation-section">
                <button className="evaluation-section-button">
                  <p>보고싶어요</p>
                </button>
                <button className="evaluation-section-button">
                  <p>평가하기</p>
                </button>
                <button className="evaluation-section-button">
                  <p>왓챠파티</p>
                </button>
                <button className="evaluation-section-button">
                  <p>더보기</p>
                </button>
              </div>
            </div>
          </section>
          <div className="detail-image">
            {movieData.backdrop && (
              <>
                <img src={getImageUrl(movieData.backdrop)} alt="Detail Image" />
                <div className="preview-overlay">
                  <button className="preview-button">미리보기 &gt;</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        {/* 컬렉션 섹션 */}
        <section>
          <div className="section-title">관련 콘텐츠</div>
          {movieData.collection && (
            <ul className="collection-list">
              <li className="collection-item">
                <img src={getImageUrl(movieData.collection.poster_path)} />
              </li>
            </ul>
          )}
        </section>

        {/* 관련 동영상 섹션 */}
        <section className="related-video">
          <div className="section-title">관련 동영상</div>
          {movieData.videos.length > 0 && (
            <div className="video-section">
              {movieData.videos.slice(0, 4).map((video) => (
                <div key={video.id} className="video-item">
                  <h4>{video.name}</h4>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={video.name}
                  >
                    보기
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 감독/출연 섹션 */}
        <section className="director-cast">
          <div className="section-title">감독/출연</div>
          <div className="member-list">
            {movieData.member.length > 0 &&
              movieData.member.slice(0, 10).map((person) => (
                <div key={person.id} className="member-item">
                  <div className="profile">
                    <div className="profile-image">
                      <img src={getImageUrl(person.profile_path)} alt={person.name} />
                    </div>
                    <div className="profile-info">
                      <div className="profile-name">{person.name}</div>
                      <div className="profile-role">
                        {person.job === "Director" ? "감독" : "배우"}
                        {person.character && ` · ${person.character}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* 리뷰 섹션 */}
        <section className="reviews-section">
          <div className="section-title">왓챠피디아 사용자 평</div>
          {movieData.reviews.length > 0 && (
            <ul>
              {movieData.reviews.map((review) => (
                <li key={review.id}>
                  <article className="reviews-item">
                    <div className="reviewer-icon">
                      {review.author_details.avatar_path ? (
                        <img src={getImageUrl(review.author_details.avatar_path)} />
                      ) : (
                        <div>{""}</div>
                      )}
                    </div>
                    <div className="review-data">
                      <div className="reviewer-detail">
                        <div className="reviewer-name">{review.author}</div>
                        <div>{review.author_details.rating}</div>
                      </div>
                      <div className="review">{review.content}</div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

// TMDB API Response Types
interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  poster_path: string | null;
  backdrop_path: string | null;
  adult: boolean;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  original_language: string;
  status: string;
  tagline: string | null;
  genres: Genre[];
}

interface CollectionPart {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Collection {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: CollectionPart[];
}

interface Member {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  /* cast member */
  cast_id?: number;
  character?: string;
  order?: number;
  /* crew member */
  department?: string;
  job?: string;
}

interface Credits {
  cast: Member[];
  crew: Member[];
}

interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface Videos {
  results: Video[];
}

interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface Reviews {
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

// API 응답 타입
interface MovieDetailsResponse extends Movie {
  belongs_to_collection: Collection | null;
  credits: Credits;
  videos: Videos;
  reviews: Reviews;
}

// 컴포넌트에서 사용할 정리된 데이터 타입
interface MovieData {
  title: string;
  releaseDate: string;
  runtime: number | null;
  voteAverage: number;
  voteCount: number;
  overview: string;
  backdrop: string | null;
  genres: Genre[];
  collection: Collection | null;
  videos: Video[];
  member: Member[];
  reviews: Review[];
}

// 데이터 변환 함수 - director 속성 추가
const transformMovieData = (response: MovieDetailsResponse): MovieData => {
  const director = response.credits.crew.find((member) => member.job === "Director") || null;

  return {
    title: response.title,
    releaseDate: response.release_date,
    runtime: response.runtime,
    voteAverage: response.vote_average,
    voteCount: response.vote_count,
    overview: response.overview,
    backdrop: response.backdrop_path,
    genres: response.genres,
    collection: response.belongs_to_collection,
    videos: response.videos.results,
    member: director ? [director, ...response.credits.cast] : response.credits.cast,
    reviews: response.reviews.results,
  };
};

export default DetailPage;
