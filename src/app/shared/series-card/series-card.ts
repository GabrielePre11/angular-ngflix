import { MOVIES_GENRES } from '@/app/models/constants/movies-genres';
import { Series } from '@/app/models/types/series.type';
import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-series-card',
  imports: [DecimalPipe],
  templateUrl: './series-card.html',
  styleUrl: './series-card.css',
})
export class SeriesCard {
  series = input.required<Series>();

  // TMDB Poster Path
  posterPath: string = 'https://image.tmdb.org/t/p/w500';

  moviesGenres = MOVIES_GENRES;
}
