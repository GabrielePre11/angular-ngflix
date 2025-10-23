import { Component } from '@angular/core';
import { HeroSection } from '../hero-section/hero-section';
import { TrendingMovies } from '../trending-movies/trending-movies';

@Component({
  selector: 'app-home',
  imports: [HeroSection, TrendingMovies],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
