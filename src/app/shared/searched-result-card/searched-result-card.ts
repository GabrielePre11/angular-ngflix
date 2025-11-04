import { MOVIES_GENRES } from '@/app/models/constants/movies-genres';
import { SERIES_GENRES } from '@/app/models/constants/series-genres';
import { SearchResultType } from '@/app/models/types/search-result.type';
import {
  WatchlistItem,
  WatchListService,
} from '@/app/services/watchlist.service';
import { posterPath } from '@/app/utils/posterPath';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-searched-result-card',
  imports: [CommonModule, DecimalPipe, RouterLink],
  templateUrl: './searched-result-card.html',
  styleUrl: './searched-result-card.css',
})
export class SearchedResultCard {
  result = input.required<SearchResultType>();

  // Services
  private watchListService = inject(WatchListService);

  // TMDB Poster Path
  posterPath = posterPath;

  // Genres
  moviesGenres = MOVIES_GENRES;
  seriesGenres = SERIES_GENRES;

  // Methods
  getCardTitle(): string {
    return this.result().media_type === 'movie'
      ? this.result().title ?? 'Unknown'
      : this.result().name ?? 'Unknown';
  }

  getRouterLink(): string[] {
    if (this.result().media_type === 'movie') {
      return ['/movie', this.result().id.toString()];
    } else if (this.result().media_type === 'tv') {
      return ['/series', this.result().id.toString()];
    }
    return ['/'];
  }

  private mapToWatchlistItem(result: SearchResultType): WatchlistItem {
    return {
      id: result.id,
      title: result.title || result.name || 'Unknown',
      poster_path: result.poster_path ?? null,
      backdrop_path: result.backdrop_path ?? null,
      overview: result.overview ?? '',
      genre_ids: result.genre_ids ?? [],
      vote_average: result.vote_average ?? 0,
      vote_count: result.vote_count ?? 0,
      release_date: result.release_date,
      first_air_date: result.first_air_date,
      media_type: result.media_type === 'movie' ? 'movie' : 'tv',
    };
  }

  toggleWatchlist(result: SearchResultType) {
    const item = this.mapToWatchlistItem(result);
    this.watchListService.toggleWatchlist(item);
  }

  isAlreadyInWatchlist(result: SearchResultType): boolean {
    const item = this.mapToWatchlistItem(result);
    return this.watchListService.isAlreadyInWatchlist(item);
  }
}
