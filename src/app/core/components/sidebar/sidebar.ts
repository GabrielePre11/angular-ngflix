import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  LucideAngularModule,
  Bookmark,
  Telescope,
  BookOpenText,
  UsersRound,
  Phone,
  ShieldQuestionMark,
  Settings,
} from 'lucide-angular';

import { SIDE_LIST, SIDE_LIST_INFOS } from '@/app/models/constants/side-links';
import { Logo } from '@/app/shared/logo/logo';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, LucideAngularModule, Logo],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  // Icons
  readonly Bookmark = Bookmark;
  readonly Telescope = Telescope;
  readonly BookOpenText = BookOpenText;
  readonly UsersRound = UsersRound;
  readonly Phone = Phone;
  readonly ShieldQuestionMark = ShieldQuestionMark;
  readonly Settings = Settings;

  // Constants
  sideList = SIDE_LIST;
  sideInfos = SIDE_LIST_INFOS;

  // Pathname
  pathName = window.location.pathname;

  // Signals
  isSidebarOpen = input.required<boolean>();
  toggleSidebar = output<boolean>();

  onClose() {
    this.toggleSidebar.emit(false);
  }
}
