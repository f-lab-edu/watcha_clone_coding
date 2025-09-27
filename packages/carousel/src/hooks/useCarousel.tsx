import React, { useState, useRef, useEffect, useCallback } from 'react';

import { CarouselProps as CarouselSlide } from '@/types/Carousel';
import { Genre } from '@/types/Movie';

type Slide = CarouselSlide | Genre;

const useCarousel = ({
  articleWidth,
  slides,
}: {
  articleWidth: number;
  slides: Slide[];
}): {
  containerRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  transitionEnabled: boolean;
  displayIndex: number;
  clonedSlides: Slide[];
  handleTransitionEnd: () => void;
  handlePrev: () => void;
  handleNext: () => void;
} => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const calculateVisibleCount = useCallback((): void => {
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

    const handleResize = (): void => {
      calculateVisibleCount();
    };

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, [calculateVisibleCount]);

  const clonedSlides = [...slides.slice(-visibleCount), ...slides, ...slides.slice(0, visibleCount)];
  const displayIndex = currentIndex + visibleCount;

  const handleNext = (): void => {
    if (!transitionEnabled) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = (): void => {
    if (!transitionEnabled) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = (): void => {
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
      return (): void => cancelAnimationFrame(timer);
    }
  }, [transitionEnabled, isInitialized]);

  return {
    containerRef,
    trackRef,
    transitionEnabled,
    displayIndex,
    clonedSlides,
    handleTransitionEnd,
    handlePrev,
    handleNext,
  };
};

export default useCarousel;
