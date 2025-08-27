export type Carousel = {
  id: number;
  rank: number;
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
  category: "popular" | "top20" | "now";
};

export type MovieCardProps = {
  slide: Carousel;
  layout: "overlay" | "top" | "left" | "none";
};
