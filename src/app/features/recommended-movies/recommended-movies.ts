import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowRight, Heart } from 'lucide-angular';

@Component({
  selector: 'app-recommended-movies',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './recommended-movies.html',
  styleUrl: './recommended-movies.css',
})
export class RecommendedMovies {
  readonly ArrowRight = ArrowRight;
  readonly Heart = Heart;
}
