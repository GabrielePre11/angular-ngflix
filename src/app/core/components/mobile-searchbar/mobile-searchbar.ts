import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-searchbar',
  imports: [CommonModule],
  templateUrl: './mobile-searchbar.html',
  styleUrl: './mobile-searchbar.css',
})
export class MobileSearchbar {
  private router = inject(Router);

  isMobileSearchbarOpen = input.required<boolean>();
  closeMobileSearchbar = output<boolean>();

  // Methods
  onClose() {
    this.closeMobileSearchbar.emit(false);
  }

  handleSubmit(e: Event, userQuery: string) {
    e.preventDefault();
    if (!userQuery.trim()) return;

    // When the user submits the form, there will be a redirect to the search page
    // with the user's query as a query parameter in the URL (?query=userQuery)
    this.router.navigate(['/search'], { queryParams: { query: userQuery } });
    this.onClose();
  }
}
