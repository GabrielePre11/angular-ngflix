import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [CommonModule, RouterLink],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  bannerImage = input.required<string>();
}
