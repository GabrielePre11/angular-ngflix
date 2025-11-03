import { Movie } from '@/app/models/types/movie.type';
import { MovieResponse } from '@/app/models/types/response.type';
import { MoviesService } from '@/app/services/movies.service';
import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MovieCard } from '@/app/shared/movie-card/movie-card';
import { LucideAngularModule, ArrowRight, ArrowLeft } from 'lucide-angular';
import { SectionTitle } from '@/app/shared/section-title/section-title';
import { SkeletonCard } from '@/app/shared/skeleton-card/skeleton-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trending-movies',
  imports: [
    MovieCard,
    LucideAngularModule,
    SectionTitle,
    SkeletonCard,
    RouterLink,
  ],
  templateUrl: './trending-movies.html',
  styleUrl: './trending-movies.css',
})
export class TrendingMovies {
  private moviesServices = inject(MoviesService);

  // Icons
  readonly ArrowLeft = ArrowLeft;
  readonly ArrowRight = ArrowRight;

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  trendingMovies = signal<Movie[] | []>([]);

  limit = Array.from({ length: 15 });

  //============= REF (VIEWCHILD) ============//
  moviesSlider = viewChild<ElementRef<HTMLUListElement>>('moviesSlider');

  //============= METHODS ============//
  scrollToLeft() {
    this.moviesSlider()?.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollToRight() {
    this.moviesSlider()?.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

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
            this.trendingMovies.set(
              data.results?.slice(0, this.limit.length) ?? []
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
