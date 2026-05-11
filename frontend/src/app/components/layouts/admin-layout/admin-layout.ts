import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Aside } from '../../shared/aside/aside';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, Aside, Header, Footer],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
