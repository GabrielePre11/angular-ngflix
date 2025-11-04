import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  WatchlistItem,
  WatchListService,
} from '@/app/services/watchlist.service';
import { RouterLink } from '@angular/router';
import { MOVIES_GENRES } from '@/app/models/constants/movies-genres';
import { SERIES_GENRES } from '@/app/models/constants/series-genres';
import { posterPath } from '@/app/utils/posterPath';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule, RouterLink],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class Watchlist {
  private watchListService = inject(WatchListService);

  watchListProducts$ = this.watchListService.watchListProducts;

  // TMDB Poster Path
  posterPath = posterPath;

  // Genres
  moviesGenres = MOVIES_GENRES;
  seriesGenres = SERIES_GENRES;

  // Methods
  toggleWatchlist(item: WatchlistItem) {
    this.watchListService.toggleWatchlist(item);
  }

  isAlreadyInWatchlist(item: WatchlistItem) {
    return this.watchListService.isAlreadyInWatchlist(item);
  }
}
