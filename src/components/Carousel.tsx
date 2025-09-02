import MovieCard from "@/components/MovieCard";
import { CarouselProps, Carousel as CarouselSlide } from "@/types/Carousel";
import Button from "@/components/Button";
import useCarousel from "@/hooks/useCarousel";
import "@/styles/Carousel.css";
import { Genre } from "@/types/Movie";
import GenresCard from "./GenresCard";

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
              <GenresCard slide={slide as Genre} layout={layout} type="genres" />
            ) : (
              <MovieCard slide={slide as CarouselSlide} layout={layout} type="movie" />
            )}
          </article>
        ))}
      </div>

      <Button onClick={handlePrev} className="slider-button slider-button-prev" aria-label={"이전 슬라이드"}>
        &#8249;
      </Button>
      <Button onClick={handleNext} className="slider-button slider-button-next" aria-label={"다음 슬라이드"}>
        &#8250;
      </Button>
    </div>
  );
};

export default Carousel;
