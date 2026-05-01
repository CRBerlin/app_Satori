import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Home } from './components/pages/home/home';
import { Login } from './components/pages/login/login';
import { Users } from './components/pages/users/users';
import { Employees } from './components/pages/employees/employees';
import { Departments } from './components/pages/departments/departments';
import { PageNotFound } from './components/pages/page-not-found/page-not-found';
import { DepartmentDetail } from './components/pages/department-detail/department-detail';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'inicio', component: Home, canActivate: [authGuard], title: 'Inicio' },
  { path: 'usuarios', component: Users, canActivate: [authGuard], title: 'Usuarios' },
  { path: 'empleados', component: Employees, canActivate: [authGuard], title: 'Empleados' },
  {
    path: 'departamentos',
    component: Departments,
    canActivate: [authGuard],
    title: 'Departamentos',
  },
  {
    path: 'departments/:code',
    component: DepartmentDetail,
    canActivate: [authGuard],
    title: 'Detalle del Departamento',
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFound, title: 'Error 404' },
];
