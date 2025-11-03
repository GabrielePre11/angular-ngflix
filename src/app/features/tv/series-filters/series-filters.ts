import { SERIES_FILTERS } from '@/app/models/constants/series-filters';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-series-filters',
  imports: [],
  templateUrl: './series-filters.html',
  styleUrl: './series-filters.css',
})
export class SeriesFilters {
  // Inputs
  filtersOpen = input.required<boolean>();

  // Constants
  seriesFilters = SERIES_FILTERS;

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

    // @@ key: first_air_date_year(or 'sort_by' or 'with_original_language' etc.)
    // @@ value: eventTarget.value: '2025' || null (it's the option selected by the user)
  }

  closeFilters() {
    this.onFiltersClose.emit(true);
  }
}
