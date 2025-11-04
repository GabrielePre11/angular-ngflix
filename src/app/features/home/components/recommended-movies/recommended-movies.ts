import { Movie } from '@/app/models/types/movie.type';
import { MovieResponse } from '@/app/models/types/response.type';
import { MoviesService } from '@/app/services/movies.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Component, effect, inject, signal } from '@angular/core';

import {
  LucideAngularModule,
  ArrowRight,
  Heart,
  ArrowLeft,
  ArrowRightIcon,
} from 'lucide-angular';

import { MovieCard } from '@/app/shared/movie-card/movie-card';
import { SectionTitle } from '@/app/shared/section-title/section-title';
import { SkeletonCard } from '@/app/shared/skeleton-card/skeleton-card';

@Component({
  selector: 'app-recommended-movies',
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    MovieCard,
    SectionTitle,
    SkeletonCard,
  ],
  templateUrl: './recommended-movies.html',
  styleUrl: './recommended-movies.css',
})
export class RecommendedMovies {
  //============= INJECTION ============//
  private moviesServices = inject(MoviesService);

  protected title =
    window.innerWidth < 350 ? 'Recommended' : 'Recommended For You';

  //============= ICONS ============//
  readonly ArrowRight = ArrowRight;
  readonly Heart = Heart;
  readonly ArrowLeft = ArrowLeft;
  readonly ArrowRightIcon = ArrowRightIcon;

  //============= SIGNALS / STATE ============//
  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  recommendedMovies = signal<Movie[] | []>([]);

  //============= CONSTANTS ============//
  limit = Array.from({ length: 4 });

  constructor() {
    effect(() => {
      // Error & Loading
      this.isLoading.set(true);
      this.errorState.set(null);

      // GET Recommended Movies
      this.moviesServices.getRecommendedMovies().subscribe({
        next: (data: MovieResponse) => {
          this.isLoading.set(false);

          if (Array.isArray(data.results)) {
            this.recommendedMovies.set(
              data.results
                .slice(0, this.limit.length)
                .sort((a, b) => b.popularity - a.popularity)
            );
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
