import { Component } from '@angular/core';
import { RecommendedMovies } from '../recommended-movies/recommended-movies';

import { HeroBanner } from '@/app/shared/hero-banner/hero-banner';
import { HeroNews } from '@/app/shared/hero-news/hero-news';

@Component({
  selector: 'app-hero-section',
  imports: [RecommendedMovies, HeroBanner, HeroNews],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {}
