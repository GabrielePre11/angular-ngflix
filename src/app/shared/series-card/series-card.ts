import { SERIES_GENRES } from '@/app/models/constants/series-genres';
import { Series } from '@/app/models/types/series.type';
import {
  WatchlistItem,
  WatchListService,
} from '@/app/services/watchlist.service';
import { posterPath } from '@/app/utils/posterPath';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-series-card',
  imports: [DecimalPipe, CommonModule, RouterLink],
  templateUrl: './series-card.html',
  styleUrl: './series-card.css',
})
export class SeriesCard {
  series = input.required<Series>();

  // Services
  private watchListService = inject(WatchListService);

  // TMDB Poster Path
  posterPath = posterPath;

  seriesGenres = SERIES_GENRES;

  // Methods

  /* TMDB's API is a mess — "Movie" and "Series" are different objects
  @ they don't share a consistent structure (different property names, missing fields, etc.).
  @ So I need to use a single "WatchlistItem" format for both movies and series,
  @ so this function converts (maps) a Series (and a Movie in the Movie Component) 
  @ into that unified WatchlistItem structure.
  
  @ Basically: TMDB gives us garbage in 10 different shapes,
  @ and this makes sure it always stores it in one clean, predictable format.
  */
  private mapSeriesToWatchlistItem(series: Series): WatchlistItem {
    return {
      id: series.id,
      title: series.name,
      poster_path: series.poster_path ?? null,
      backdrop_path: series.backdrop_path ?? null,
      overview: series.overview,
      genre_ids: series.genre_ids,
      vote_average: series.vote_average,
      vote_count: series.vote_count,
      first_air_date: series.first_air_date,
      media_type: 'tv',
    };
  }

  toggleWatchlist(series: Series) {
    const item = this.mapSeriesToWatchlistItem(series);
    this.watchListService.toggleWatchlist(item);
  }

  isAlreadyInWatchlist(series: Series): boolean {
    const item = this.mapSeriesToWatchlistItem(series);
    return this.watchListService.isAlreadyInWatchlist(item);
  }
}
