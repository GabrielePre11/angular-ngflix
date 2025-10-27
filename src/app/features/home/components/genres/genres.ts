import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { SectionTitle } from '@/app/shared/section-title/section-title';
import { SERIES_GENRES } from '@/app/models/constants/series-genres';
import { LucideAngularModule, ArrowLeft, ArrowRight } from 'lucide-angular';
import { SeriesService } from '@/app/services/series.service';
import { SeriesResponse } from '@/app/models/types/response.type';
import { Series } from '@/app/models/types/series.type';
import { CommonModule } from '@angular/common';
import { SeriesCard } from '@/app/shared/series-card/series-card';

@Component({
  selector: 'app-genres',
  imports: [SectionTitle, LucideAngularModule, CommonModule, SeriesCard],
  templateUrl: './genres.html',
  styleUrl: './genres.css',
})
export class Genres {
  private seriesServices = inject(SeriesService);

  // Icons
  readonly ArrowLeft = ArrowLeft;
  readonly ArrowRight = ArrowRight;

  //============= GENRES FROM MOVIES_GENRES CONSTANT ============//
  genres = Object.entries(SERIES_GENRES).map(([id, name]) => ({
    id: Number(id),
    name,
  }));

  //============= REF (VIEWCHILD) ============//
  genresSlider = viewChild<ElementRef<HTMLUListElement>>('genresSlider');

  //============= SIGNALS ============//
  selectedGenre = signal((this.genres[0].id as number) || null);
  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  genreSeries = signal<Series[] | []>([]);

  //============= METHODS ============//
  scrollToLeft() {
    this.genresSlider()?.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollToRight() {
    this.genresSlider()?.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  constructor() {
    effect(() => {
      // Angular will re-render the component when the selectedGenre signal changes.
      const genreId = this.selectedGenre();
      if (!genreId) return;

      this.isLoading.set(true);
      this.errorState.set(null);

      this.seriesServices.getGenreSeries(genreId).subscribe({
        next: (data: SeriesResponse) => {
          this.isLoading.set(false);

          if (Array.isArray(data.results)) {
            this.genreSeries.set(data.results.slice(0, 25));
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
