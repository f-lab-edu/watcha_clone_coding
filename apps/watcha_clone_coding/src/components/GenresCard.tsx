import { ReactElement } from 'react';

import Button from '@/components/Button';
import useMovieCard from '@/hooks/useMovieCard';
import { GenredCardProps } from '@/types/Carousel';

const GenresCard = (props: GenredCardProps): ReactElement => {
  const { handleGenreClick, generateRandomGradient } = useMovieCard(props);

  return (
    <Button className={`slider-card slider-card-${props.layout}`} onClick={handleGenreClick}>
      <div
        className="slider-image-container"
        style={{
          background: generateRandomGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          outline: 0,
          border: 0,
        }}
      ></div>
      <div className={`slider-content slider-content-${props.layout}`}>
        <h3 className="slider-title">{props.slide.name}</h3>
      </div>
    </Button>
  );
};

export default GenresCard;
