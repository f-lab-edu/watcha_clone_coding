import useMovieDetail from "@/hooks/useMovieDetail";
import { Genre, Member, Review, Video } from "@/types/Movie";
import Button from "@/components/Button";
import Status from "@/components/Status";
import "@/styles/Detail.css";

import Interest from "@/assets/interest.svg";
import Assessment from "@/assets/assessment.svg";
import Party from "@/assets/party.svg";
import More from "@/assets/more.svg";
import { buildImageUrl } from "@/utils/transform";

const DetailPage = () => {
  const { movieData, reviews, isLoading, error, getReleaseYear, changeTimeFormat } = useMovieDetail();

  console.log(movieData);
  

  if (isLoading) return <Status.Loading />;
  if (error) return <Status.ErrorState message={error.message} />;
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
                {movieData.genres.map((genre: Genre) => (
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
                <span className="vote-average-value">{movieData.voteAverage?.toFixed(1) || "0.0"}</span>
                <span className="vote-dest">평균 별점</span>
              </div>
              <div className="detail-vote-count">
                <span className="vote-count-value">{movieData.voteCount?.toLocaleString() || "0"}</span>
                <span className="vote-dest">평가 수</span>
              </div>
            </div>
            <div className="get-my-list">
              <div className="purchase-section">
                <Button className="purchase-button">구매하기</Button>
                <Button className="gift-button">선물하기</Button>
              </div>
              <div className="evaluation-section">
                <Button className="evaluation-section-button" icon={<Interest />}>
                  <p>보고싶어요</p>
                </Button>
                <Button className="evaluation-section-button" icon={<Assessment />}>
                  <p>평가하기</p>
                </Button>
                <Button className="evaluation-section-button" icon={<Party />}>
                  <p>왓챠파티</p>
                </Button>
                <Button className="evaluation-section-button" icon={<More />}>
                  <p>더보기</p>
                </Button>
              </div>
            </div>
          </section>
          <div className="detail-image">
            {movieData.backdrop && (
              <>
                <img src={buildImageUrl(movieData.backdrop)} alt="Detail Image" />
                <div className="preview-overlay">
                  <Button className="preview-button">{"미리보기 >"}</Button>
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
                <img src={buildImageUrl(movieData.collection.poster_path)} />
              </li>
            </ul>
          )}
        </section>

        {/* 관련 동영상 섹션 */}
        <section className="related-video">
          <div className="section-title">관련 동영상</div>
          {movieData.videos.length > 0 && (
            <div className="video-section">
              {movieData.videos.slice(0, 4).map((video: Video) => (
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
              movieData.member.slice(0, 10).map((person: Member) => (
                <div key={person.id} className="member-item">
                  <div className="profile">
                    <div className="profile-image">
                      <img src={buildImageUrl(person.profile_path)} alt={person.name} />
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
          {reviews.length > 0 && (
            <ul>
              {reviews.map((review: Review) => (
                <li key={review.id}>
                  <article className="reviews-item">
                    <div className="reviewer-icon">
                      {review.author_details.avatar_path ? (
                        <img src={buildImageUrl(review.author_details.avatar_path)} />
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

export default DetailPage;
