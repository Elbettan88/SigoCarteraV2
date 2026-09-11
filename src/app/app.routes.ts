import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { Sidebar } from './components/sidebar/sidebar';
import { DashboardV2 } from './components/dashboard-v2/dashboard-v2'; // 🟢 Conexión directa y limpia
import { Usuarios } from './components/usuarios/usuarios';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: Sidebar,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardV2, data: { modoResumen: true } },
      { path: 'cartera/:moneda', component: DashboardV2, data: { modoResumen: false } },
      { path: 'usuarios', component: Usuarios, data: { roles: ['ADMINISTRADOR'] } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
