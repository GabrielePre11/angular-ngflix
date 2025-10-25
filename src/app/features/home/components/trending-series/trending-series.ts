import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { SectionTitle } from '@/app/shared/section-title/section-title';
import { LucideAngularModule, ArrowLeft, ArrowRight } from 'lucide-angular';
import { SeriesService } from '@/app/services/series.service';
import { SeriesResponse } from '@/app/models/types/response.type';
import { Series } from '@/app/models/types/series.type';
import { SeriesCard } from '@/app/shared/series-card/series-card';

@Component({
  selector: 'app-trending-series',
  imports: [SectionTitle, LucideAngularModule, SeriesCard],
  templateUrl: './trending-series.html',
  styleUrl: './trending-series.css',
})
export class TrendingSeries {
  private moviesServices = inject(SeriesService);

  readonly ArrowLeft = ArrowLeft;
  readonly ArrowRight = ArrowRight;

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  trendingSeries = signal<Series[] | []>([]);

  //============= REF (VIEWCHILD) ============//
  seriesSlider = viewChild<ElementRef<HTMLUListElement>>('seriesSlider');

  //============= METHODS ============//
  scrollToLeft() {
    this.seriesSlider()?.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollToRight() {
    this.seriesSlider()?.nativeElement.scrollBy({
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
      this.moviesServices.getTrendingSeries().subscribe({
        next: (data: SeriesResponse) => {
          this.isLoading.set(false);

          if (Array.isArray(data.results)) {
            this.trendingSeries.set(data.results.splice(0, 15));
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
