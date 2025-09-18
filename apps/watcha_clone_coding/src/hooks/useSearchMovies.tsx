import { useEffect, useState } from 'react';

const useSearchMovies = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((prevIndex) => (prevIndex === 9 ? 0 : prevIndex + 1));
    }, 2000); // 2초마다 다음 아이템으로

    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  return {
    highlightedIndex,
    handleMouseEnter,
  };
};

export default useSearchMovies;
