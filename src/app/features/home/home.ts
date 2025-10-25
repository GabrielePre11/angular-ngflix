import { Component } from '@angular/core';
import { TrendingMovies } from './components/trending-movies/trending-movies';
import { HeroSection } from './components/hero-section/hero-section';
import { TrendingSeries } from './components/trending-series/trending-series';

@Component({
  selector: 'app-home',
  imports: [HeroSection, TrendingMovies, TrendingSeries],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
