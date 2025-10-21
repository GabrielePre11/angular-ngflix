import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [CommonModule, RouterLink],
  templateUrl: './logo.html',
  styleUrl: './logo.css',
})
export class Logo {}
