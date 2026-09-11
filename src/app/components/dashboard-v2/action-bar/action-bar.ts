import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-bar.html',
  styleUrls: ['./action-bar.scss'],
})
export class ActionBar {
  // 🟢 Evento que envía la cadena de búsqueda limpia hacia el componente padre
  @Output() alBuscar = new EventEmitter<string>();

  emitirBusqueda(event: Event) {
    const input = event.target as HTMLInputElement;
    this.alBuscar.emit(input.value); // Dispara el filtro de forma reactiva
  }
}
