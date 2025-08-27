export interface RawMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
}

export interface TransformedMovie {
  id: number;
  rank: number;
  image: string;
  title: string;
  description: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  poster_path: string | null;
  backdrop_path: string | null;
  adult: boolean;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  original_language: string;
  status: string;
  tagline: string | null;
  genres: Genre[];
}

export interface CollectionPart {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Collection {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: CollectionPart[];
}

export interface Member {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  /* cast member */
  cast_id?: number;
  character?: string;
  order?: number;
  /* crew member */
  department?: string;
  job?: string;
}

export interface Credits {
  cast: Member[];
  crew: Member[];
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Videos {
  results: Video[];
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

export interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface Reviews {
  reviews: Review[];
}

// 컴포넌트에서 사용할 정리된 데이터 타입
export interface MovieData {
  title: string;
  releaseDate: string;
  runtime: number | null;
  voteAverage: number;
  voteCount: number;
  overview: string;
  backdrop: string | null;
  genres: Genre[];
  collection: Collection | null;
  videos: Video[];
  member: Member[];
}
