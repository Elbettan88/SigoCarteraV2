import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutService {
  // Manejo de estado reactivo ultra rápido con Signals de Angular
  usuarioActual = signal<any>(null);

  constructor() {
    this.restaurarSesion();
  }

  iniciarSesion(usuario: string, clave: string): boolean {
    // Simulación inicial de credenciales empresariales seguras
    if (usuario === 'admin@sigo.com' && clave === 'Sigo2026!') {
      const payload = {
        usuario: 'Administrador Sigo',
        rol: 'ADMINISTRADOR',
        token: 'jwt_v2_session_token',
      };
      this.guardarSesion(payload);
      return true;
    } else if (usuario === 'gestor@sigo.com' && clave === 'Cobros2026!') {
      const payload = {
        usuario: 'Gestor de Cobros',
        rol: 'GESTOR',
        token: 'jwt_v2_session_token',
      };
      this.guardarSesion(payload);
      return true;
    }
    return false;
  }

  private guardarSesion(payload: any) {
    localStorage.setItem('sigo_v2_session', JSON.stringify(payload));
    this.usuarioActual.set(payload);
  }

  estaAutenticado(): boolean {
    return localStorage.getItem('sigo_v2_session') !== null;
  }

  obtenerRolUsuario(): string {
    const sesion = localStorage.getItem('sigo_v2_session');
    return sesion ? JSON.parse(sesion).rol : 'CONSULTOR';
  }

  obtenerNombreUsuario(): string {
    const sesion = localStorage.getItem('sigo_v2_session');
    return sesion ? JSON.parse(sesion).usuario : 'Invitado';
  }

  cerrarSesion() {
    localStorage.removeItem('sigo_v2_session');
    this.usuarioActual.set(null);
  }

  private restaurarSesion() {
    const sesion = localStorage.getItem('sigo_v2_session');
    if (sesion) this.usuarioActual.set(JSON.parse(sesion));
  }
}
