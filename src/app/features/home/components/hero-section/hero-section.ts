import { Component, effect, inject, signal } from '@angular/core';
import { RecommendedMovies } from '../recommended-movies/recommended-movies';
import { MoviesService } from '@/app/services/movies.service';
import { Movie } from '@/app/models/types/movie.type';
import { MovieResponse } from '@/app/models/types/movies-response.type';
import { MOVIES_GENRES } from '@/app/models/constants/movies-genres';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [RecommendedMovies, DecimalPipe, DatePipe],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  private moviesServices = inject(MoviesService);

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  heroMovie = signal<Movie | null>(null);

  // TMDB Poster Path
  posterPath: string = 'https://image.tmdb.org/t/p/w500';

  moviesGenres = MOVIES_GENRES;

  constructor() {
    effect(() => {
      // Error & Loading
      this.isLoading.set(true);
      this.errorState.set(null);

      // GET Hero Movie to show the banner
      this.moviesServices.getHeroBanner().subscribe({
        next: (data: MovieResponse) => {
          this.isLoading.set(false);

          if (Array.isArray(data.results)) {
            this.heroMovie.set(data.results[0]);
          }
        },
        error: (err) => {
          if (err instanceof Error) {
            this.isLoading.set(false);
            this.errorState.set(err.message);
          }
        },
      });
    });
  }
}
