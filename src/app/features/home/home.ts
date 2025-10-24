import { Component } from '@angular/core';
import { TrendingMovies } from './components/trending-movies/trending-movies';
import { HeroSection } from './components/hero-section/hero-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection, TrendingMovies],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
