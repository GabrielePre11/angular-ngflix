import { SeriesResponse } from '@/app/models/types/response.type';
import { SeriesDetailType } from '@/app/models/types/series-detail.type';
import { Series } from '@/app/models/types/series.type';
import { SeriesService } from '@/app/services/series.service';
import { posterPath } from '@/app/utils/posterPath';
import { seriesInformationsList } from '@/app/utils/seriesInformationsList';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { SkeletonCard } from '@/app/shared/skeleton-card/skeleton-card';
import { SeriesCard } from '@/app/shared/series-card/series-card';

@Component({
  selector: 'app-series-detail-page',
  imports: [CommonModule, LucideAngularModule, SkeletonCard, SeriesCard],
  templateUrl: './series-detail-page.html',
  styleUrl: './series-detail-page.css',
})
export class SeriesDetailPage implements OnInit {
  private seriesServices = inject(SeriesService);

  constructor(private route: ActivatedRoute) {}

  // ID
  seriesId: number | null = null;

  // Signals
  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  series = signal<SeriesDetailType | null>(null);
  similarSeries = signal<Series[] | []>([]);

  // Movies Limit
  limit = Array.from({ length: 10 });

  // Poster Path & Informations
  posterPath = posterPath;
  seriesInformationsList = seriesInformationsList;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.seriesId = Number(id);
        this.effect();
      }
    });
  }

  effect() {
    this.isLoading.set(true);
    this.errorState.set(null);

    if (this.seriesId) {
      // Series
      this.seriesServices.getSeries(this.seriesId).subscribe({
        next: (data: SeriesDetailType) => {
          this.isLoading.set(false);
          this.series.set(data);
        },
        error: (err) => {
          if (err instanceof Error) {
            this.isLoading.set(false);
            this.errorState.set(err.message);
          }
          return err;
        },
      });

      // Similar Series
      this.seriesServices.getSimilarSeries(this.seriesId).subscribe({
        next: (data: SeriesResponse) => {
          this.isLoading.set(false);
          this.similarSeries.set(data.results);
        },
        error: (err) => {
          if (err instanceof Error) {
            this.isLoading.set(false);
            this.errorState.set(err.message);
          }
          return err;
        },
      });
    }
  }
}
