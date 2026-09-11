import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AutService } from '../../services/aut';
import { ThemeToggle } from './theme-toggle/theme-toggle'; // 🟢 Importado

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ThemeToggle, // 🟢 Registrado correctamente en la metadata modular
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {
  // Inyectores públicos para lectura nativa desde el HTML
  public autService = inject(AutService);
  private router = inject(Router);

  // Estado reactivo: false = Expandido corporativo, true = Colapsado minimalista
  public menuColapsado = signal<boolean>(false);

  // Estado condicional exclusivo por si estás en vistas móviles
  public menuAbierto = signal<boolean>(false);

  logoutV2() {
    this.autService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
