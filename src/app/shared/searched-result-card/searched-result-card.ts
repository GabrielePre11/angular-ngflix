import { MOVIES_GENRES } from '@/app/models/constants/movies-genres';
import { SERIES_GENRES } from '@/app/models/constants/series-genres';
import { SearchResultType } from '@/app/models/types/search-result.type';
import { posterPath } from '@/app/utils/posterPath';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-searched-result-card',
  imports: [CommonModule, DecimalPipe, RouterLink],
  templateUrl: './searched-result-card.html',
  styleUrl: './searched-result-card.css',
})
export class SearchedResultCard {
  result = input.required<SearchResultType>();

  // TMDB Poster Path
  posterPath = posterPath;

  // Genres
  moviesGenres = MOVIES_GENRES;
  seriesGenres = SERIES_GENRES;

  // Methods
  getCardTitle() {
    if (this.result().media_type === 'movie') {
      return this.result().title;
    } else {
      return this.result().name;
    }
  }

  getRouterLink() {
    if (this.result().media_type === 'movie') {
      return ['/movie', this.result().id];
    } else if (this.result().media_type === 'tv') {
      return ['/series', this.result().id];
    } else {
      return ['/'];
    }
  }
}
