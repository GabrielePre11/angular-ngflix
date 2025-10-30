import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './core/components/sidebar/sidebar';
import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Sidebar, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-ngflix';
  isSidebarOpen = signal<boolean>(true);

  openSidebar() {
    this.isSidebarOpen.set(true);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
