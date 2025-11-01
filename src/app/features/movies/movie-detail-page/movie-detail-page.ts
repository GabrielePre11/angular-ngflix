import { MovieDetailType } from '@/app/models/types/movie-detail.type';
import { Movie } from '@/app/models/types/movie.type';
import { MovieResponse } from '@/app/models/types/response.type';
import { MoviesService } from '@/app/services/movies.service';
import { posterPath } from '@/app/utils/posterPath';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MovieCard } from '@/app/shared/movie-card/movie-card';
import { SkeletonCard } from '@/app/shared/skeleton-card/skeleton-card';
import { movieInformationsList } from '@/app/utils/movieInformationsList';

@Component({
  selector: 'app-movie-detail-page',
  imports: [CommonModule, LucideAngularModule, MovieCard, SkeletonCard],
  templateUrl: './movie-detail-page.html',
  styleUrl: './movie-detail-page.css',
})
export class MovieDetailPage implements OnInit {
  private moviesServices = inject(MoviesService);

  constructor(private route: ActivatedRoute) {}

  // ID
  movieId: number | null = null;

  // Signals
  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  movie = signal<MovieDetailType | null>(null);
  similarMovies = signal<Movie[] | []>([]);

  // Movies Limit
  limit = Array.from({ length: 10 });

  // Poster Path
  posterPath = posterPath;
  movieInformationsList = movieInformationsList;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.movieId = Number(id);
        this.effect();
      }
    });
  }

  effect() {
    this.isLoading.set(true);
    this.errorState.set(null);

    if (this.movieId) {
      // Movie
      this.moviesServices.getMovie(this.movieId).subscribe({
        next: (data: MovieDetailType) => {
          this.isLoading.set(false);
          this.movie.set(data);
        },
        error: (err) => {
          if (err instanceof Error) {
            this.isLoading.set(false);
            this.errorState.set(err.message);
          }
          return err;
        },
      });

      // Similar Movies
      this.moviesServices.getSimilarMovies(this.movieId).subscribe({
        next: (data: MovieResponse) => {
          this.isLoading.set(false);
          this.similarMovies.set(data.results);
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
