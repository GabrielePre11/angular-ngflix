import { Movie } from '@/app/models/types/movie.type';
import { MovieResponse } from '@/app/models/types/movies-response.type';
import { MoviesService } from '@/app/services/movies.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowRight, Heart } from 'lucide-angular';
import { MovieCard } from '@/app/shared/movie-card/movie-card';

@Component({
  selector: 'app-recommended-movies',
  imports: [CommonModule, RouterModule, LucideAngularModule, MovieCard],
  templateUrl: './recommended-movies.html',
  styleUrl: './recommended-movies.css',
})
export class RecommendedMovies {
  private moviesServices = inject(MoviesService);

  // Icons
  readonly ArrowRight = ArrowRight;
  readonly Heart = Heart;

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  recommendedMovies = signal<Movie[] | []>([]);

  constructor() {
    effect(() => {
      // Error & Loading
      this.isLoading.set(true);
      this.errorState.set(null);

      // GET Recommended Movies
      this.moviesServices.getRecommendedMovies().subscribe({
        next: (data: MovieResponse) => {
          console.log(data);
          this.recommendedMovies.set(data.results.slice(0, 4));
          this.isLoading.set(false);
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
