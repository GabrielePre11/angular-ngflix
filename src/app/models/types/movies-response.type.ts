import { Movie } from '@/app/models/types/movie.type';

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
