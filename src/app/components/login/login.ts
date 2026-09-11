import { Component, inject, signal } from '@angular/core'; // 🟢 CORREGIDO: Se re-inyectó 'inject' en la cabecera del core
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutService } from '../../services/aut';
import { LoginToast } from './login-toast/login-toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginToast],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  // Inyección moderna de dependencias operando al 100%
  private autService = inject(AutService);
  private router = inject(Router);

  // Variables reactivas de formulario acopladas al Glassmorphism
  credenciales = {
    correo: '',
    password: '',
  };
  recordarSesion = false;

  // Estados de carga controlados mediante Signals de Angular 18
  cargando = signal<boolean>(false);
  errorMensaje = signal<string>('');

  // Signal de control para activar la consola gemela del Toast corporativo
  mostrarMensajeExito = signal<boolean>(false);

  ejecutarAutenticacionV2() {
    this.errorMensaje.set('');
    this.cargando.set(true);

    // Retardo visual de 600ms para emular la respuesta de red de un ERP de alta gama
    setTimeout(() => {
      const exito = this.autService.iniciarSesion(
        this.credenciales.correo,
        this.credenciales.password,
      );
      this.cargando.set(false);

      if (exito) {
        // 🟢 TRANSICIÓN EXTENDIDA DE AUDITORÍA
        this.mostrarMensajeExito.set(true);

        // ⚡ Retardo ampliado a 10 segundos para generar máxima confianza y seguridad institucional
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 10000);
      } else {
        this.errorMensaje.set('Las credenciales ingresadas no corresponden a un rol activo.');
        alert('⚠️ ' + this.errorMensaje());
      }
    }, 600);
  }
}
