import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}