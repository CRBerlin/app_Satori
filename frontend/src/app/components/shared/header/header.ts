import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  get user() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
