import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Home } from './components/pages/home/home';
import { Login } from './components/pages/login/login';
import { Users } from './components/pages/users/users';
import { Exercises } from './components/pages/exercises/exercises';
import { PageNotFound } from './components/pages/page-not-found/page-not-found';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'inicio', component: Home, canActivate: [authGuard], title: 'Inicio' },
  { path: 'usuarios', component: Users, canActivate: [authGuard], title: 'Usuarios' },
  { path: 'ejercicios', component: Exercises, canActivate: [authGuard], title: 'Ejercicios' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFound, title: 'Error 404' },
];
