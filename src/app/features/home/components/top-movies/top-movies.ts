import { Movie } from '@/app/models/types/movie.type';
import { MovieResponse } from '@/app/models/types/response.type';
import { MoviesService } from '@/app/services/movies.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { LucideAngularModule, ArrowLeft, ArrowRight } from 'lucide-angular';
import { SectionTitle } from '@/app/shared/section-title/section-title';
import { MovieCard } from '@/app/shared/movie-card/movie-card';
import { SkeletonCard } from '@/app/shared/skeleton-card/skeleton-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-movies',
  imports: [
    CommonModule,
    LucideAngularModule,
    SectionTitle,
    MovieCard,
    SkeletonCard,
    RouterLink,
  ],
  templateUrl: './top-movies.html',
  styleUrl: './top-movies.css',
})
export class TopMovies {
  private moviesServices = inject(MoviesService);

  // Icons
  readonly ArrowLeft = ArrowLeft;
  readonly ArrowRight = ArrowRight;

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  topMovies = signal<Movie[] | []>([]);

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
      this.isLoading.set(true);
      this.errorState.set(null);

      this.moviesServices.getTopMovies().subscribe({
        next: (data: MovieResponse) => {
          this.isLoading.set(false);

          if (Array.isArray(data.results)) {
            this.topMovies.set(data.results.slice(0, this.limit.length) || []);
          }
        },
        error: (err) => {
          if (err instanceof Error) {
            this.isLoading.set(false);
            this.errorState.set(err.message);
          }
          return err;
        },
      });
    });
  }
}
