import { SeriesResponse } from '@/app/models/types/response.type';
import { Series } from '@/app/models/types/series.type';
import { SeriesService } from '@/app/services/series.service';
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
import { SeriesCard } from '@/app/shared/series-card/series-card';
import { SectionTitle } from '@/app/shared/section-title/section-title';
import { SkeletonCard } from '@/app/shared/skeleton-card/skeleton-card';

@Component({
  selector: 'app-top-series',
  imports: [
    CommonModule,
    LucideAngularModule,
    SeriesCard,
    SectionTitle,
    SkeletonCard,
  ],
  templateUrl: './top-series.html',
  styleUrl: './top-series.css',
})
export class TopSeries {
  private seriesServices = inject(SeriesService);

  // Icons
  readonly ArrowLeft = ArrowLeft;
  readonly ArrowRight = ArrowRight;

  //============= REF (VIEWCHILD) ============//
  seriesSlider = viewChild<ElementRef<HTMLUListElement>>('seriesSlider');

  //============= SIGNALS ============//
  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  topSeries = signal<Series[] | []>([]);

  limit = Array.from({ length: 15 });

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
      this.isLoading.set(true);
      this.errorState.set(null);

      this.seriesServices.getTopSeries().subscribe({
        next: (data: SeriesResponse) => {
          this.isLoading.set(false);

          if (Array.isArray(data.results)) {
            this.topSeries.set(data.results.slice(0, this.limit.length) || []);
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
