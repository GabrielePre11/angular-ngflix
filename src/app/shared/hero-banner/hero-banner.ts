import { MOVIES_GENRES } from '@/app/models/constants/movies-genres';
import { Movie } from '@/app/models/types/movie.type';
import { MovieResponse } from '@/app/models/types/response.type';
import { MoviesService } from '@/app/services/movies.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { posterPath } from '@/app/utils/posterPath';

@Component({
  selector: 'app-hero-banner',
  imports: [CommonModule, DecimalPipe],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.css',
})
export class HeroBanner {
  private moviesServices = inject(MoviesService);

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  heroMovie = signal<Movie | null>(null);

  moviesGenres = MOVIES_GENRES;
  posterPath: string = posterPath;

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
