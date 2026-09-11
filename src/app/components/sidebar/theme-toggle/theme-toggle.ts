import { Component, OnInit, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
  styleUrls: ['./theme-toggle.scss'],
})
export class ThemeToggle implements OnInit {
  // Recibe la instrucción del Sidebar por si está colapsado u oculto
  @Input() mostrarTexto: boolean = true;

  public esModoOscuro = signal<boolean>(true);

  ngOnInit() {
    // 1. Validar si el usuario ya tenía un tema guardado en su navegador
    const temaGuardado = localStorage.getItem('sigo_v2_theme');

    if (temaGuardado === 'light') {
      this.esModoOscuro.set(false);
      document.body.classList.add('light-theme');
    } else {
      this.esModoOscuro.set(true);
      document.body.classList.remove('light-theme');
    }
  }

  alternarTemaV2() {
    // 2. Alternar el estado de la señal reactiva
    this.esModoOscuro.set(!this.esModoOscuro());

    // 3. Inyectar o remover la clase en el body raíz de la aplicación web
    if (this.esModoOscuro()) {
      document.body.classList.remove('light-theme');
      localStorage.setItem('sigo_v2_theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      localStorage.setItem('sigo_v2_theme', 'light');
    }
  }
}
