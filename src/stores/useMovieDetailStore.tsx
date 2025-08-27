import { create } from "zustand";
import { MovieData, Review } from "../types/Movie";

interface MovieDetailState {
  movieDetail: MovieData;
  reviews: Review[];
  setMovieDetail: (movieData: MovieData) => void;
  setReviews: (reviews: Review[]) => void;
}

const useMovieDetailStore = create<MovieDetailState>((set) => ({
  movieDetail: {
    title: "",
    releaseDate: "",
    runtime: null,
    voteAverage: 0,
    voteCount: 0,
    overview: "",
    backdrop: null,
    genres: [],
    collection: null,
    videos: [],
    member: [],
    reviews: [],
  },
  setMovieDetail: (movieData: MovieData) =>
    set(() => ({
      movieDetail: movieData,
    })),
  reviews: [],
  setReviews: (reviews: Review[]) =>
    set(() => ({
      reviews: reviews,
    })),
}));

export default useMovieDetailStore;
