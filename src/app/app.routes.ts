import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/app/features/home/home').then((m) => m.Home),
  },

  {
    path: 'movies',
    loadComponent: () =>
      import('@/app/features/movies/movies-page/movies-page').then(
        (m) => m.MoviesPage
      ),
  },

  {
    path: 'movie/:id',
    loadComponent: () =>
      import('@/app/features/movies/movie-detail-page/movie-detail-page').then(
        (m) => m.MovieDetailPage
      ),
  },

  {
    path: 'series',
    loadComponent: () =>
      import('@/app/features/tv/series-page/series-page').then(
        (m) => m.SeriesPage
      ),
  },

  {
    path: 'series/:id',
    loadComponent: () =>
      import('@/app/features/tv/series-detail-page/series-detail-page').then(
        (m) => m.SeriesDetailPage
      ),
  },

  {
    path: 'search',
    loadComponent: () =>
      import('@/app/features/search/search/search').then((m) => m.Search),
  },
];
