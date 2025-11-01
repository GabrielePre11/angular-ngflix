import { MovieDetailType } from '../models/types/movie-detail.type';
import {
  Flag,
  Calendar,
  Languages,
  Hourglass,
  CircleDollarSign,
  Ticket,
  Star,
  Barcode,
} from 'lucide-angular';

export const movieInformationsList = [
  {
    title: 'Country',
    getValue: (movie: MovieDetailType | null) =>
      movie?.production_countries?.[0]?.name ?? 'N/A',
    icon: Flag,
  },
  {
    title: 'Release Date',
    getValue: (movie: MovieDetailType | null) =>
      movie ? new Date(movie.release_date).toLocaleDateString() : 'N/A',
    icon: Calendar,
  },
  {
    title: 'Language',
    getValue: (movie: MovieDetailType | null) =>
      movie?.original_language?.toUpperCase() ?? 'N/A',
    icon: Languages,
  },
  {
    title: 'Runtime',
    getValue: (movie: MovieDetailType | null) =>
      movie?.runtime
        ? `${Math.floor(movie.runtime / 60)} hour and ${movie.runtime % 60} min`
        : 'N/A',
    icon: Hourglass,
  },
  {
    title: 'Budget',
    getValue: (movie: MovieDetailType | null) =>
      movie?.budget ? `$${movie.budget}` : 'N/A',
    icon: CircleDollarSign,
  },
  {
    title: 'Status',
    getValue: (movie: MovieDetailType | null) =>
      movie?.status === 'Released' ? 'Released' : 'Not Released',
    icon: Ticket,
  },
  {
    title: 'Vote Average',
    getValue: (movie: MovieDetailType | null) =>
      movie?.vote_average ? `${movie.vote_average.toFixed(1)}/10` : 'N/A',
    icon: Star,
  },
  {
    title: 'IMDB ID',
    getValue: (movie: MovieDetailType | null) =>
      movie?.imdb_id ? `tt${movie.imdb_id.toUpperCase()}` : 'N/A',
    icon: Barcode,
  },
];
