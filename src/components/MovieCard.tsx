import { Link } from "react-router-dom";
import { MovieCardProps } from "../types/Carousel";
import useMovieCard from "../hooks/useMovieCard";
import Button from "./Button";

const MovieCard = (props: MovieCardProps) => {
  const { handleGenreClick, generateRandomGradient } = useMovieCard(props);

  if (props.type === "genres") {
    return (
      <Button
        className={`slider-card slider-card-${props.layout}`}
        onClick={handleGenreClick}
        value={
          <>
            <div
              className="slider-image-container"
              style={{
                background: generateRandomGradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                outline: 0,
                border: 0,
              }}
            ></div>
            <div className={`slider-content slider-content-${props.layout}`}>
              <h3 className="slider-title">{props.slide.name}</h3>
            </div>
          </>
        }
      />
    );
  } else {
    return (
      <Link to={`/movie/${props.slide.id}`}>
        <div className={`slider-card slider-card-${props.layout}`}>
          <div className="slider-image-container">
            <img src={props.slide.image} alt={props.slide.title} className="slider-image" />
          </div>
          <div className={`slider-content slider-content-${props.layout}`}>
            {props.layout !== "left" && <h3 className="slider-title">{props.slide.title}</h3>}
            {props.slide.description && props.layout !== "none" && props.layout !== "left" && (
              <p className="slider-description">{props.slide.description}</p>
            )}
            {props.layout === "left" && (
              <span className="slider-content-rank" data-rank={props.slide.rank}>
                {props.slide.rank}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }
};

export default MovieCard;
