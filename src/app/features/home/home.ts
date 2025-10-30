import { Component } from '@angular/core';
import { TrendingMovies } from './components/trending-movies/trending-movies';
import { HeroSection } from './components/hero-section/hero-section';
import { TrendingSeries } from './components/trending-series/trending-series';
import { Genres } from './components/genres/genres';
import { TopMovies } from './components/top-movies/top-movies';
import { TopSeries } from './components/top-series/top-series';
import { Banner } from '@/app/shared/banner/banner';

@Component({
  selector: 'app-home',
  imports: [
    HeroSection,
    TrendingMovies,
    TrendingSeries,
    Genres,
    TopMovies,
    TopSeries,
    Banner,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
