import { Genre } from "./Movie";

export type Carousel = {
  id: number;
  rank?: number;
  image: string;
  title: string;
  description?: string;
  href?: string;
  onClick?: () => void;
};

export type CarouselProps = {
  height: number;
  articleWidth: number;
  layout?: "overlay" | "top" | "left" | "none"; // side를 left로 변경
  category?: "popular" | "top20" | "now";
  slides?: any[]; // 외부에서 직접 주입 (e.g., genresList)
};

export type MovieCardProps =
  | { type: "genres"; slide: Genre; layout: "overlay" | "top" | "left" | "none" }
  | { type: "movie"; slide: Carousel; layout: "overlay" | "top" | "left" | "none" };
