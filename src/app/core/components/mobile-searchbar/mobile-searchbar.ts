import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-mobile-searchbar',
  imports: [CommonModule],
  templateUrl: './mobile-searchbar.html',
  styleUrl: './mobile-searchbar.css',
})
export class MobileSearchbar {
  isMobileSearchbarOpen = input.required<boolean>();
  closeMobileSearchbar = output<boolean>();

  onClose() {
    this.closeMobileSearchbar.emit(false);
  }
}
