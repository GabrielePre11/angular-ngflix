import { Movie } from '@/app/models/types/movie.type';
import { Series } from './series.type';

// I used generics because TypeScript doesn’t actually know whether the response
// contains movies or series data. By using a generic type like <T>, we can define it later
// (ex. Response<Movie> or Response<Series>) and still keep full type safety.

interface Response<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type MovieResponse = Response<Movie>;
export type SeriesResponse = Response<Series>;
