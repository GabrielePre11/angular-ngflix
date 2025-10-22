import { Component } from '@angular/core';
import { RecommendedMovies } from '../recommended-movies/recommended-movies';

@Component({
  selector: 'app-hero-section',
  imports: [RecommendedMovies],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {}
