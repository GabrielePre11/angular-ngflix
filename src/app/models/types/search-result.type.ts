export interface SearchResultType {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;

  title?: string; // Movie's Property
  name?: string; // Series's Property
  release_date?: string; // Movie's Property
  first_air_date?: string; // Series's Property
  media_type?: 'movie' | 'tv';
}
