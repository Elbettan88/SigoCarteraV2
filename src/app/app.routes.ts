import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { Sidebar } from './components/sidebar/sidebar';
import { DashboardV2 } from './components/dashboard-v2/dashboard-v2'; // 🟢 Conexión directa y limpia
import { Usuarios } from './components/usuarios/usuarios';
import { HistoricoFacturas } from './components/historico-facturas/historico-facturas'; // 🟢 Importación del nuevo módulo independiente
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: Sidebar,
    canActivate: [authGuard],
    children: [
      // Mapeo Ejecutivo del Cuadro de Mando Consolidado
      { path: 'dashboard', component: DashboardV2, data: { modoResumen: true } },

      // Ruta Parametrizada Operativa (Segmentación Automática GTQ / USD)
      { path: 'cartera/:moneda', component: DashboardV2, data: { modoResumen: false } },

      // 🟢 NUEVA RUTA AUTÓNOMA: Histórico de facturas aislado sin interferencias
      { path: 'historico', component: HistoricoFacturas },

      // Control y Gestión de Roles de Personal
      { path: 'usuarios', component: Usuarios, data: { roles: ['ADMINISTRADOR'] } },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
