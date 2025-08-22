import React, { useState, useRef, useEffect, useCallback } from "react";
import "../styles/Slider.css";

type Slide = {
  id: number;
  rank: number;
  image: string;
  title: string;
  description?: string;
  href?: string;
  onClick?: () => void;
};

type SliderProps = {
  slides: Slide[];
  height: string;
  articleWidth?: number;
  layout?: "overlay" | "top" | "left" | "none"; // side를 left로 변경
};

const Slider: React.FC<SliderProps> = ({ slides, height, articleWidth = 280, layout = "overlay" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const calculateVisibleCount = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const count = Math.ceil(containerWidth / articleWidth);
      const newVisibleCount = Math.max(1, count);

      if (newVisibleCount !== visibleCount) {
        setVisibleCount(newVisibleCount);
        setTransitionEnabled(false);
      }

      if (!isInitialized) {
        setIsInitialized(true);
      }
    }
  }, [articleWidth, visibleCount, isInitialized]);

  useEffect(() => {
    calculateVisibleCount();

    const handleResize = () => {
      calculateVisibleCount();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateVisibleCount]);

  const clonedSlides = [...slides.slice(-visibleCount), ...slides, ...slides.slice(0, visibleCount)];
  const displayIndex = currentIndex + visibleCount;

  const handleNext = () => {
    if (!transitionEnabled) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!transitionEnabled) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= slides.length) {
      setTransitionEnabled(false);
      setCurrentIndex(0);
    } else if (currentIndex < 0) {
      setTransitionEnabled(false);
      setCurrentIndex(slides.length - 1);
    }
  };

  useEffect(() => {
    if (!transitionEnabled && isInitialized) {
      const timer = requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [transitionEnabled, isInitialized]);

  return (
    <div
      ref={containerRef}
      className="slider-container"
      style={{
        height,
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
            <div className={`slider-card slider-card-${layout}`}>
              <div className="slider-image-container">
                <img src={slide.image} alt={slide.title} className="slider-image" />
              </div>
              <div className={`slider-content slider-content-${layout}`}>
                {layout !== "left" && <h3 className="slider-title">{slide.title}</h3>}
                {slide.description && layout !== "none" && layout !== "left" && (
                  <p className="slider-description">{slide.description}</p>
                )}
                {layout === "left" && (
                  <span className="slider-content-rank" data-rank={slide.rank}>
                    {slide.rank}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <button onClick={handlePrev} className="slider-button slider-button-prev" aria-label="이전 슬라이드">
        &#8249;
      </button>
      <button onClick={handleNext} className="slider-button slider-button-next" aria-label="다음 슬라이드">
        &#8250;
      </button>
    </div>
  );
};

export default Slider;
