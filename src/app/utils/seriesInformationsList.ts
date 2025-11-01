import { SeriesDetailType } from '../models/types/series-detail.type';

import {
  Flag,
  Calendar,
  Languages,
  TvMinimalPlay,
  Star,
  Play,
  CircleAlert,
} from 'lucide-angular';

export const seriesInformationsList = [
  {
    title: 'Country',
    getValue: (series: SeriesDetailType | null) =>
      series?.production_countries?.[0]?.name ?? 'N/A',
    icon: Flag,
  },
  {
    title: 'First Air Date',
    getValue: (series: SeriesDetailType | null) =>
      series ? new Date(series.first_air_date).toLocaleDateString() : 'N/A',
    icon: Calendar,
  },
  {
    title: 'Last Air Date',
    getValue: (series: SeriesDetailType | null) =>
      series ? new Date(series.last_air_date).toLocaleDateString() : 'N/A',
    icon: Calendar,
  },
  {
    title: 'Language',
    getValue: (series: SeriesDetailType | null) =>
      series?.original_language?.toUpperCase() ?? 'N/A',
    icon: Languages,
  },
  {
    title: 'Episodes & Seasons',
    getValue: (series: SeriesDetailType | null) =>
      `${series?.number_of_episodes} ep. | ${series?.number_of_seasons} s.`,
    icon: Play,
  },
  {
    title: 'In Production',
    getValue: (series: SeriesDetailType | null) =>
      series?.in_production ? 'Yes' : 'No',
    icon: TvMinimalPlay,
  },
  {
    title: '18+',
    getValue: (series: SeriesDetailType | null) =>
      series?.adult ? 'Yes' : 'No',
    icon: CircleAlert,
  },
  {
    title: 'Vote Average',
    getValue: (movie: SeriesDetailType | null) =>
      movie?.vote_average ? `${movie.vote_average.toFixed(1)}/10` : 'N/A',
    icon: Star,
  },
];
