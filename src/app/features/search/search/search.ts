import { SearchService } from '@/app/services/search.service';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeletonCard } from '@/app/shared/skeleton-card/skeleton-card';
import { SearchedResultCard } from '@/app/shared/searched-result-card/searched-result-card';
import { SearchResultType } from '@/app/models/types/search-result.type';

@Component({
  selector: 'app-search',
  imports: [CommonModule, SkeletonCard, SearchedResultCard],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private searchService = inject(SearchService);
  private route = inject(ActivatedRoute);

  // Signals
  readonly userQuery = signal<string>('');
  results = signal<SearchResultType[]>([]);
  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);

  // Constants
  limit = Array.from({ length: 20 });

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.userQuery.set(params['query'] || '');
    });

    effect(() => {
      this.isLoading.set(true);
      this.errorState.set(null);

      if (!this.userQuery().trim()) {
        this.results.set([]);
        this.isLoading.set(false);
        return;
      }

      this.searchService
        .searchMoviesAndSeries(this.userQuery().trim().toLowerCase())
        .subscribe({
          next: (data: SearchResultType[]) => {
            this.isLoading.set(false);
            this.results.set(data);
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
