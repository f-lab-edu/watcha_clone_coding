import MovieCard from "@/components/MovieCard";
import { CarouselProps, Carousel as CarouselSlide } from "@/types/Carousel";
import Button from "@/components/Button";
import useCarousel from "@/hooks/useCarousel";
import "@/styles/Carousel.css";
import { Genre } from "@/types/Movie";

const Carousel: React.FC<CarouselProps> = ({ height, articleWidth, layout = "overlay", slides }) => {
  const {
    containerRef,
    trackRef,
    transitionEnabled,
    displayIndex,
    clonedSlides,
    handleTransitionEnd,
    handlePrev,
    handleNext,
  } = useCarousel({ articleWidth, slides: slides ?? [] });

  if (!slides || slides.length === 0) return <div>데이터가 없습니다.</div>;

  const isGenres = slides.length > 0 && !("image" in slides[0]);

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
            {isGenres ? (
              <MovieCard slide={slide as Genre} layout={layout} type="genres" />
            ) : (
              <MovieCard slide={slide as CarouselSlide} layout={layout} type="movie" />
            )}
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
