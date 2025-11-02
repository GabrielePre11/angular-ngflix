import { Movie } from '@/app/models/types/movie.type';
import { MovieResponse } from '@/app/models/types/response.type';
import { MoviesService } from '@/app/services/movies.service';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { SkeletonCard } from '@/app/shared/skeleton-card/skeleton-card';
import { MovieCard } from '@/app/shared/movie-card/movie-card';
import { MovieFiltersType } from '@/app/models/types/movie-filters.type';
import { MoviesFilters } from '../movies-filters/movies-filters';

@Component({
  selector: 'app-movies-page',
  imports: [CommonModule, SkeletonCard, MovieCard, MoviesFilters],
  templateUrl: './movies-page.html',
  styleUrl: './movies-page.css',
})
export class MoviesPage {
  private moviesServices = inject(MoviesService);

  // Signals
  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  filtersOpen = signal<boolean>(false);

  currentPage = signal<number>(1);
  totalMovies = signal<number>(0);
  totalPages = signal<number>(0);
  movies = signal<Movie[] | []>([]);

  // Selected Filters (Partial means that the filters are optional)
  selectedFilters = signal<Partial<MovieFiltersType>>({
    primary_release_year: null,
    sort_by: null,
    with_original_language: null,
  });

  // Constants
  limit = Array.from({ length: 15 });
  moviesLimit = 15;

  // Methods
  toggleFilters() {
    this.filtersOpen.update((prev) => !prev);
  }

  goToPrevPage() {
    if (this.currentPage() > 1) this.currentPage.update((prev) => prev - 1);
  }

  goToNextPage() {
    if (this.currentPage() < this.totalPages())
      this.currentPage.update((prev) => prev + 1);
  }

  updateFilters(filterKey: string, value: string | number | null) {
    this.selectedFilters.update((prev) => ({
      ...prev,
      [filterKey]: value,

      // @@ filterKey: 'primary_release_year' (or 'sort_by' or 'with_original_language')
      // @@ value: eventTarget.value: '2025' || null (it's the option selected by the user)
    }));
  }

  constructor() {
    effect(() => {
      this.isLoading.set(true);
      this.errorState.set(null);

      this.moviesServices
        .getAllMovies(this.currentPage(), this.selectedFilters())
        .subscribe({
          next: (data: MovieResponse) => {
            if (Array.isArray(data.results)) {
              this.isLoading.set(false);
              this.totalMovies.set(data.total_results);
              this.totalPages.set(
                Math.ceil(data.total_pages / this.moviesLimit)
              );
              this.movies.set(data.results.slice(0, this.moviesLimit));
            }
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
