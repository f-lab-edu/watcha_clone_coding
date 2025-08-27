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
