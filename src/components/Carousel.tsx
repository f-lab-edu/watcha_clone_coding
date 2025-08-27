import MovieCard from "./MovieCard";
import { CarouselProps } from "../types/Carousel";
import Button from "./Button";
import useCarousel from "../hooks/useCarousel";
import "../styles/Carousel.css";
import useMovieList from "../hooks/useMovieList";

const Carousel: React.FC<CarouselProps> = ({ height, articleWidth, layout = "overlay" }) => {
  const { movieList, isLoading, error } = useMovieList();

  const {
    containerRef,
    trackRef,
    transitionEnabled,
    displayIndex,
    clonedSlides,
    handleTransitionEnd,
    handlePrev,
    handleNext,
  } = useCarousel({ slider: movieList, articleWidth, layout });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div
      ref={containerRef}
      className="slider-container"
      style={{
        height: `${height}px`,
      }}
    >
      <div
        ref={trackRef}
        className={`slider-track ${!transitionEnabled ? "no-transition" : ""}`}
        style={{
          transform: `translateX(-${displayIndex * articleWidth}px)`,
          width: `${clonedSlides.length * articleWidth}px`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {clonedSlides.map((slide, index) => (
          <article
            key={`${slide.id}-${index}`}
            className={`slider-article slider-article-${layout}`}
            style={{
              width: `${articleWidth}px`,
            }}
          >
            <MovieCard slide={slide} layout={layout} />
          </article>
        ))}
      </div>

      <Button
        value="&#8249;"
        onClick={handlePrev}
        className="slider-button slider-button-prev"
        ariaLabel={"이전 슬라이드"}
      />
      <Button
        value="&#8250;"
        onClick={handleNext}
        className="slider-button slider-button-next"
        ariaLabel={"다음 슬라이드"}
      />
    </div>
  );
};

export default Carousel;
