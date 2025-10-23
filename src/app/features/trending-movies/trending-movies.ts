import { Movie } from '@/app/models/types/movie.type';
import { MovieResponse } from '@/app/models/types/movies-response.type';
import { MoviesService } from '@/app/services/movies.service';
import { Component, effect, inject, signal } from '@angular/core';
import { MovieCard } from '@/app/shared/movie-card/movie-card';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';
import { SectionTitle } from '@/app/shared/section-title/section-title';

@Component({
  selector: 'app-trending-movies',
  imports: [MovieCard, LucideAngularModule, SectionTitle],
  templateUrl: './trending-movies.html',
  styleUrl: './trending-movies.css',
})
export class TrendingMovies {
  private moviesServices = inject(MoviesService);

  // Icons
  readonly ArrowRight = ArrowRight;

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  trendingMovies = signal<Movie[] | []>([]);

  constructor() {
    effect(() => {
      // Error & Loading
      this.isLoading.set(true);
      this.errorState.set(null);

      // GET Recommended Movies
      this.moviesServices.getTrendingMovies().subscribe({
        next: (data: MovieResponse) => {
          this.isLoading.set(false);

          if (Array.isArray(data.results)) {
            this.trendingMovies.set(data.results.splice(0, 15));
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
