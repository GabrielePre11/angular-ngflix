import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-desktop-searchbar',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './desktop-searchbar.html',
  styleUrl: './desktop-searchbar.css',
})
export class DesktopSearchbar {
  readonly Search = Search;
}
