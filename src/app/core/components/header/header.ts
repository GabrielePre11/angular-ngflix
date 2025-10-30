import { Component, effect, signal } from '@angular/core';
import { Logo } from '@/app/shared/logo/logo';
import { LucideAngularModule, Menu, Search, LogIn } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { DesktopSearchbar } from '../desktop-searchbar/desktop-searchbar';
import { MobileMenu } from '../mobile-menu/mobile-menu';

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

  // Open Mobile Menu
  openMobileMenu() {
    this.isMobileMenuOpen.update((prev) => !prev);
  }

  constructor() {
    effect(() => {
      if (this.isMobileMenuOpen()) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });
  }
}
