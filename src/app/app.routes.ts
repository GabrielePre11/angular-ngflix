import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/app/features/home/home').then((m) => m.Home),
  },
  // {
  //     path: 'movies',
  //     loadComponent: () => import('./features/movies/movies.component').then((m) => m.MoviesComponent),
  // },
  // {
  //     path: 'series',
  //     loadComponent: () => import('./features/series/series.component').then((m) => m.SeriesComponent),
  // },
  // {
  //     path: 'genres',
  //     loadComponent: () => import('./features/genres/genres.component').then((m) => m.GenresComponent),
  // },
];
