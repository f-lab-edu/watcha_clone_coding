import { useMemo } from 'react';

import useSearchMovie from '@/hooks/useSearchMovie';
import { GenredCardProps, MovieCardProps } from '@/types/Carousel';

const useMovieCard = (props: MovieCardProps | GenredCardProps) => {
  const { searchByGenre } = useSearchMovie();

  const generateRandomGradient = useMemo(() => {
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEAA7',
      '#DDA0DD',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
      '#85C1E9',
      '#F8C471',
      '#82E0AA',
      '#F1948A',
      '#85C1E9',
      '#D7BDE2',
    ];

    // slide의 id나 name을 기반으로 결정적 색상 선택
    const seed = props.type === 'genres' ? props.slide.name : props.slide.title;
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color1Index = hash % colors.length;
    const color2Index = (hash * 2) % colors.length;

    const color1 = colors[color1Index];
    const color2 = colors[color2Index];

    return `linear-gradient(135deg, ${color1}, ${color2})`;
  }, [props.type === 'genres' ? props.slide.name : props.slide.title]);

  const handleGenreClick = () => {
    if (props.type === 'genres') {
      searchByGenre(props.slide.id.toString());
    }
  };

  return {
    handleGenreClick,
    generateRandomGradient,
  };
};

export default useMovieCard;
