import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Home } from './components/pages/home/home';
import { Login } from './components/pages/login/login';
import { Users } from './components/pages/users/users';
import { Exercises } from './components/pages/exercises/exercises';
import { UserWorkout } from './components/pages/user-workout/user-workout';
import { WorkoutPlan } from './components/pages/workout-plan/workout-plan';
import { PageNotFound } from './components/pages/page-not-found/page-not-found';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'inicio', component: Home, canActivate: [authGuard], title: 'Inicio' },
  { path: 'usuarios', component: Users, canActivate: [authGuard], title: 'Usuarios' },
  { path: 'ejercicios', component: Exercises, canActivate: [authGuard], title: 'Ejercicios' },
  { path: 'planes', component: WorkoutPlan, canActivate: [authGuard], title: 'Plan de Entrenamiento' },
  { path: 'mi-plan', component: UserWorkout, canActivate: [authGuard], title: 'Mi Plan de Entrenamiento' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFound, title: 'Error 404' },
];
