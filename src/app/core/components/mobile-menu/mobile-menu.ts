import { NAV_LIST } from '@/app/models/constants/nav-links';
import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Logo } from '@/app/shared/logo/logo';

@Component({
  selector: 'app-mobile-menu',
  imports: [CommonModule, RouterModule, RouterLink, Logo],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.css',
})
export class MobileMenu {
  navList = NAV_LIST;
  pathName = signal(window.location.pathname);

  isMobileMenuOpen = input.required<boolean>();
  closeMobileMenu = output<boolean>();

  // Close the Mobile Menu by emitting an event to the parent (the header component)
  onClose() {
    this.closeMobileMenu.emit(false);
  }
}
