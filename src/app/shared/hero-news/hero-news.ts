import { Movie } from '@/app/models/types/movie.type';
import { MovieResponse } from '@/app/models/types/response.type';
import { MoviesService } from '@/app/services/movies.service';
import { posterPath } from '@/app/utils/posterPath';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-hero-news',
  imports: [CommonModule, DatePipe],
  templateUrl: './hero-news.html',
  styleUrl: './hero-news.css',
})
export class HeroNews {
  private moviesServices = inject(MoviesService);

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  newsMovie = signal<Movie | null>(null);

  // Poster Path
  posterPath: string = posterPath;

  constructor() {
    effect(() => {
      // Error & Loading
      this.isLoading.set(true);
      this.errorState.set(null);

      // Movie
      this.moviesServices
        .getTopMovies()
        .pipe(map((data: MovieResponse) => data.results[0]))
        .subscribe({
          next: (data: Movie) => {
            this.isLoading.set(false);
            this.newsMovie.set(data);
          },
          error: (err) => {
            this.isLoading.set(false);
            if (err instanceof Error) {
              this.errorState.set(err.message);
            } else {
              this.errorState.set('Unknown error');
            }
          },
        });
    });
  }
}
