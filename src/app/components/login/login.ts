import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutService } from '../../services/aut';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  // Inyección moderna de dependencias sin constructores rígidos
  private autService = inject(AutService);
  private router = inject(Router);

  // Variables reactivas bidireccionales de formulario
  correo: string = '';
  clave: string = '';

  // Estados de carga de interfaz controlados mediante Signals de Angular 18
  cargando = signal<boolean>(false);
  errorMensaje = signal<string>('');

  ejecutarLoginV2(event: Event) {
    event.preventDefault();
    this.errorMensaje.set('');
    this.cargando.set(true);

    // Pequeño retardo visual táctil de 600ms para emular la respuesta de red responsiva
    setTimeout(() => {
      const exito = this.autService.iniciarSesion(this.correo, this.clave);
      this.cargando.set(false);

      if (exito) {
        // Redirige al Dashboard V2 si la credencial es correcta
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMensaje.set(
          'Las credenciales ingresadas no corresponden a un rol activo o están mal escritas.',
        );
      }
    }, 600);
  }
}
