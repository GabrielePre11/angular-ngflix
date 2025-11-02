import { MOVIES_FILTERS } from '@/app/models/constants/movies-filters';
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-movies-filters',
  imports: [CommonModule],
  templateUrl: './movies-filters.html',
  styleUrl: './movies-filters.css',
})
export class MoviesFilters {
  // Inputs
  filtersOpen = input.required<boolean>();

  // Constants
  moviesFilters = MOVIES_FILTERS;

  // Outputs
  onFiltersChange = output<{ type: string; value: string | number | null }>();
  onFiltersClose = output<boolean>();

  // Methods
  changeFilters(filterKey: string, e: Event) {
    const eventTarget = e.target as HTMLSelectElement;

    this.onFiltersChange.emit({
      type: filterKey,
      value: eventTarget.value || null,
    });

    // @@ filterKey: 'primary_release_year' (or 'sort_by' or 'with_original_language')
    // @@ value: eventTarget.value: '2025' || null (it's the option selected by the user)
  }

  closeFilters() {
    this.onFiltersClose.emit(true);
  }
}
