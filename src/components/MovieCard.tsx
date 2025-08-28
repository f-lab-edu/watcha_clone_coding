import { Link } from "react-router-dom";
import { MovieCardProps } from "../types/Carousel";
import { useMemo } from "react";

const MovieCard = (props: MovieCardProps) => {
  if (props.type === "genres") {
    const generateRandomGradient = useMemo(() => {
      const colors = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
        "#DDA0DD",
        "#98D8C8",
        "#F7DC6F",
        "#BB8FCE",
        "#85C1E9",
        "#F8C471",
        "#82E0AA",
        "#F1948A",
        "#85C1E9",
        "#D7BDE2",
      ];
      const color1 = colors[Math.floor(Math.random() * colors.length)];
      const color2 = colors[Math.floor(Math.random() * colors.length)];
      return `linear-gradient(135deg, ${color1}, ${color2})`;
    }, [props.slide.name]);
    return (
      // <Link to={}>
      <div className={`slider-card slider-card-${props.layout}`}>
        <div
          className="slider-image-container"
          style={{
            background: generateRandomGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
        <div className={`slider-content slider-content-${props.layout}`}>
          <h3 className="slider-title">{props.slide.name}</h3>
        </div>
      </div>
      // </Link>
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
