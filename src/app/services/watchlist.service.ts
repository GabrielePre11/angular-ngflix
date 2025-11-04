import { effect, Injectable, signal } from '@angular/core';

export interface WatchlistItem {
  id: number;
  title?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  media_type: 'movie' | 'tv';
}

@Injectable({ providedIn: 'root' })
export class WatchListService {
  private watchListProductsState = JSON.parse(
    localStorage.getItem('watchlistProducts') || '[]'
  );

  watchListProducts = signal<WatchlistItem[]>(this.watchListProductsState);

  constructor() {
    effect(() => {
      localStorage.setItem(
        'watchlistProducts',
        JSON.stringify(this.watchListProducts())
      );
    });
  }

  toggleWatchlist(item: WatchlistItem) {
    this.watchListProducts.update((state) => {
      const exists = state.some((i) => i.id === item.id);
      return exists ? state.filter((i) => i.id !== item.id) : [...state, item];
    });
  }

  isAlreadyInWatchlist(item: WatchlistItem): boolean {
    return this.watchListProducts().some((i) => i.id === item.id);
  }

  clearWatchlist() {
    this.watchListProducts.set([]);
  }
}
