import { SeriesResponse } from '@/app/models/types/response.type';
import { Series } from '@/app/models/types/series.type';
import { SeriesService } from '@/app/services/series.service';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { SkeletonCard } from '@/app/shared/skeleton-card/skeleton-card';
import { SeriesCard } from '@/app/shared/series-card/series-card';
import { SeriesFiltersType } from '@/app/models/types/series-filters.type';
import { SeriesFilters } from '../series-filters/series-filters';

@Component({
  selector: 'app-series-page',
  imports: [CommonModule, SkeletonCard, SeriesCard, SeriesFilters],
  templateUrl: './series-page.html',
  styleUrl: './series-page.css',
})
export class SeriesPage {
  private seriesService = inject(SeriesService);

  // Signals
  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  filtersOpen = signal<boolean>(false);

  currentPage = signal<number>(1);
  totalSeries = signal<number>(0);
  totalPages = signal<number>(0);
  series = signal<Series[] | []>([]);

  // Selected Filters (Partial means that the filters are optional)
  selectedFilters = signal<Partial<SeriesFiltersType>>({
    first_air_date_year: null,
    sort_by: null,
    with_original_language: null,
    with_networks: null,
  });

  // Constants
  limit = Array.from({ length: 15 });
  seriesLimit = 15;

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

      // @@ key: first_air_date_year(or 'sort_by' or 'with_original_language' etc.)
      // @@ value: eventTarget.value: '2025' || null (it's the option selected by the user)
    }));
  }

  constructor() {
    effect(() => {
      this.isLoading.set(true);
      this.errorState.set(null);

      this.seriesService
        .getAllSeries(this.currentPage(), this.selectedFilters())
        .subscribe({
          next: (data: SeriesResponse) => {
            if (Array.isArray(data.results)) {
              this.isLoading.set(false);
              this.totalSeries.set(data.total_results);
              this.totalPages.set(
                Math.ceil(data.total_pages / this.seriesLimit)
              );
              this.series.set(data.results.slice(0, this.seriesLimit));
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
