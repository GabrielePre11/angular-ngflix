import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './core/components/sidebar/sidebar';
import { Container } from './core/layout/container/container';
import { Header } from './core/components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Container, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-ngflix';
}
