import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './core/components/sidebar/sidebar';
import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { CommonModule } from '@angular/common';
import { Container } from './core/layout/container/container';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Sidebar, Header, Footer, Container],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-ngflix';
  isSidebarOpen = signal<boolean>(true);

  // "Value" is emitted from the child component (sidebar). Once the value is emitted (with a click of the button), Angular detects the change and re-renders the component
  openSidebar(value: boolean) {
    this.isSidebarOpen.set(value);
  }
  closeSidebar(value: boolean) {
    this.isSidebarOpen.set(value);
  }
}
