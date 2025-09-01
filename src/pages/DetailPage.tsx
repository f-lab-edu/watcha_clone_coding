import useMovieDetail from "@/hooks/useMovieDetail";
import { Genre, Member, Review, Video } from "@/types/Movie";
import Button from "@/components/Button";
import "@/styles/Detail.css";

const DetailPage = () => {
  const { movieData, reviews, isLoading, error, getReleaseYear, changeTimeFormat, getImageUrl } = useMovieDetail();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error.message}</div>;
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
                <Button className="purchase-button" value="구매하기" />
                <Button className="gift-button" value="선물하기" />
              </div>
              <div className="evaluation-section">
                <Button
                  className="evaluation-section-button"
                  value={
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="M12 2a.75.75 0 0 0-.75.75v8.5h-8.5a.75.75 0 0 0 0 1.5h8.5v8.5a.75.75 0 0 0 1.5 0v-8.5h8.5a.75.75 0 0 0 0-1.5h-8.5v-8.5A.75.75 0 0 0 12 2"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <p>보고싶어요</p>
                    </>
                  }
                />
                <Button
                  className="evaluation-section-button"
                  value={
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          stroke="currentColor"
                          stroke-width="1.5"
                          d="m2.41 9.9-.52.53.52-.54 6.09-.88a1 1 0 0 0 .75-.55l2.73-5.52 2.72 5.52a1 1 0 0 0 .75.55l6.08.88-4.45 4.3a1 1 0 0 0-.3.89l.73-.13-.72.13 1.08 6.05-5.43-2.86a1 1 0 0 0-.93 0l-5.44 2.87 1.04-6.07a1 1 0 0 0-.3-.88z"
                        ></path>
                      </svg>
                      <p>평가하기</p>
                    </>
                  }
                />
                <Button
                  className="evaluation-section-button"
                  value={
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M11 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2M9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0M14 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                        ></path>
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="M2 5c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v8.32a2 2 0 0 1-2 2h-8L6.72 18.7A1 1 0 0 1 5 18v-2.67H4a2 2 0 0 1-2-2zm3 8.72c.88 0 1.6.72 1.6 1.6v1.2l2.25-2.31c.3-.31.72-.49 1.15-.49h8a.4.4 0 0 0 .4-.4V5a.4.4 0 0 0-.4-.4H4a.4.4 0 0 0-.4.4v8.32c0 .22.18.4.4.4z"
                          clip-rule="evenodd"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M10 17.52c0 .45.36.8.8.8H15l3.28 3.38A1 1 0 0 0 20 21v-2.68h1a2 2 0 0 0 2-2V10.8a.8.8 0 0 0-1.6 0v5.52a.4.4 0 0 1-.4.4h-1c-.88 0-1.6.72-1.6 1.6v1.2l-2.25-2.31a1.6 1.6 0 0 0-1.15-.49h-4.2a.8.8 0 0 0-.8.8"
                        ></path>
                      </svg>
                      <p>왓챠파티</p>
                    </>
                  }
                />
                <Button
                  className="evaluation-section-button"
                  value={
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="M13.5 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m0 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <p>더보기</p>
                    </>
                  }
                />
              </div>
            </div>
          </section>
          <div className="detail-image">
            {movieData.backdrop && (
              <>
                <img src={getImageUrl(movieData.backdrop)} alt="Detail Image" />
                <div className="preview-overlay">
                  <Button className="preview-button" value="미리보기 >" />
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
          {reviews.length > 0 && (
            <ul>
              {reviews.map((review: Review) => (
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

export default DetailPage;
