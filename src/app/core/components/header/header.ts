import { Component, effect, input, output, signal } from '@angular/core';
import { Logo } from '@/app/shared/logo/logo';
import { LucideAngularModule, Menu, Search, LogIn } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { DesktopSearchbar } from '../desktop-searchbar/desktop-searchbar';
import { MobileMenu } from '../mobile-menu/mobile-menu';
import { MobileSearchbar } from '../mobile-searchbar/mobile-searchbar';

@Component({
  selector: 'app-header',
  imports: [
    Logo,
    LucideAngularModule,
    CommonModule,
    RouterModule,
    Navbar,
    DesktopSearchbar,
    MobileMenu,
    MobileSearchbar,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly Menu = Menu;
  readonly Search = Search;
  readonly LogIn = LogIn;

  isMobileMenuOpen = signal<boolean>(false);
  isMobileSearchbarOpen = signal<boolean>(false);

  isSidebarOpen = input.required<boolean>();
  openSidebar = output<boolean>();

  // Open Mobile Menu
  openMobileMenu() {
    this.isMobileMenuOpen.update((prev) => !prev);
    this.isMobileSearchbarOpen.set(false);
  }

  // Open Sidebar
  onSidebarOpen() {
    this.openSidebar.emit(true);
  }

  // Open Mobile Searchbar
  openMobileSearchbar() {
    this.isMobileSearchbarOpen.update((prev) => !prev);
    this.isMobileMenuOpen.set(false);
  }

  constructor() {
    effect(() => {
      if (this.isMobileMenuOpen() || this.isMobileSearchbarOpen()) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });
  }
}
