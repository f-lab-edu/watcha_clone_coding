import { Link } from "react-router-dom";
import { MovieCardProps } from "../types/Carousel";

const MovieCard = ({ slide, layout }: MovieCardProps) => {
  return (
    <Link to={`/movie/${slide.id}`}>
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
    </Link>
  );
};

export default MovieCard;
