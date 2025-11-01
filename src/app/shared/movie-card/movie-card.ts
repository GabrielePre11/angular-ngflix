import { MOVIES_GENRES } from '@/app/models/constants/movies-genres';
import { Movie } from '@/app/models/types/movie.type';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, DecimalPipe, RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  movie = input.required<Movie>();

  // TMDB Poster Path
  posterPath: string = 'https://image.tmdb.org/t/p/w500';

  moviesGenres = MOVIES_GENRES;
}
