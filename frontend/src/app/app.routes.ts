import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';

import { AdminLayout } from './components/layouts/admin-layout/admin-layout';
import { AuthLayout } from './components/layouts/auth-layout/auth-layout';

import { Home } from './components/pages/home/home';
import { Login } from './components/pages/login/login';
import { Users } from './components/pages/users/users';
import { Exercises } from './components/pages/exercises/exercises';
import { UserWorkout } from './components/pages/user-workout/user-workout';
import { WorkoutPlan } from './components/pages/workout-plan/workout-plan';
import { PageNotFound } from './components/pages/page-not-found/page-not-found';

export const routes: Routes = [
  // =========================
  // DEFAULT
  // =========================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // =========================
  // AUTH LAYOUT
  // =========================

  {
    path: '',
    component: AuthLayout,

    children: [
      {
        path: 'login',
        component: Login,
        title: 'Login',
      },
    ],
  },

  // =========================
  // ADMIN LAYOUT
  // =========================

  {
    path: '',
    component: AdminLayout,

    canActivate: [authGuard],

    children: [
      {
        path: 'inicio',
        component: Home,
        title: 'Inicio',
      },

      {
        path: 'usuarios',
        component: Users,
        title: 'Usuarios',
      },

      {
        path: 'ejercicios',
        component: Exercises,
        title: 'Ejercicios',
      },

      {
        path: 'planes',
        component: WorkoutPlan,
        title: 'Plan de Entrenamiento',
      },

      {
        path: 'mi-plan',
        component: UserWorkout,
        title: 'Mi Plan de Entrenamiento',
      },
    ],
  },

  // =========================
  // 404
  // =========================

  {
    path: '**',
    component: PageNotFound,
    title: 'Error 404',
  },
];
