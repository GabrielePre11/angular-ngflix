import { Component } from '@angular/core';
import { Logo } from '@/app/shared/logo/logo';
import { FOOTER_LINKS } from '@/app/models/constants/footer-links';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [Logo, RouterModule, RouterLink, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  footerLinks = FOOTER_LINKS;
  currentYear = new Date().getFullYear();
}
