import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-desktop-searchbar',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './desktop-searchbar.html',
  styleUrl: './desktop-searchbar.css',
})
export class DesktopSearchbar {
  private router = inject(Router);

  // Icons
  readonly Search = Search;

  // Methods
  handleSubmit(e: Event, userQuery: string) {
    e.preventDefault();
    if (!userQuery.trim()) return;

    // When the user submits the form, there will be a redirect to the search page
    // with the user's query as a query parameter in the URL (?query=userQuery)
    this.router.navigate(['/search'], { queryParams: { query: userQuery } });
  }
}
