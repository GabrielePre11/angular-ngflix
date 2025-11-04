import { MOVIES_GENRES } from '@/app/models/constants/movies-genres';
import { Movie } from '@/app/models/types/movie.type';
import {
  WatchlistItem,
  WatchListService,
} from '@/app/services/watchlist.service';
import { posterPath } from '@/app/utils/posterPath';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, DecimalPipe, RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  // Inputs
  movie = input.required<Movie>();

  // Services
  private watchListService = inject(WatchListService);

  // TMDB Poster Path
  posterPath = posterPath;

  moviesGenres = MOVIES_GENRES;

  // Methods

  /* TMDB's API is a mess — "Movie" and "Series" are different objects
  @ they don't share a consistent structure (different property names, missing fields, etc.).
  @ So I need to use a single "WatchlistItem" format for both movies and series,
  @ so this function converts (maps) a Movie (and a Series in the Series Component) 
  @ into that unified WatchlistItem structure.
  
  @ Basically: TMDB gives us garbage in 10 different shapes,
  @ and this makes sure it always stores it in one clean, predictable format.
  */
  private mapMovieToWatchlistItem(movie: Movie): WatchlistItem {
    return {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path ?? null,
      backdrop_path: movie.backdrop_path ?? null,
      overview: movie.overview,
      genre_ids: movie.genre_ids,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      release_date: movie.release_date,
      media_type: 'movie',
    };
  }

  toggleWatchlist(movie: Movie) {
    const item = this.mapMovieToWatchlistItem(movie);
    this.watchListService.toggleWatchlist(item);
  }

  isAlreadyInWatchlist(movie: Movie): boolean {
    const item = this.mapMovieToWatchlistItem(movie);
    return this.watchListService.isAlreadyInWatchlist(item);
  }
}
