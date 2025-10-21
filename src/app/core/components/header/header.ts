import { Component } from '@angular/core';
import { Logo } from '@/app/shared/logo/logo';
import { LucideAngularModule, Menu, Search, LogIn } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { DesktopSearchbar } from '../desktop-searchbar/desktop-searchbar';

@Component({
  selector: 'app-header',
  imports: [
    Logo,
    LucideAngularModule,
    CommonModule,
    RouterModule,
    Navbar,
    DesktopSearchbar,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly Menu = Menu;
  readonly Search = Search;
  readonly LogIn = LogIn;
}
