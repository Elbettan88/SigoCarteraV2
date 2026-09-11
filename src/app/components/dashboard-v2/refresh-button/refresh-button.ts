import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-refresh-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refresh-button.html',
  styleUrls: ['./refresh-button.scss'],
})
export class RefreshButton {
  // 🟢 El "cable de salida" que notificará al componente maestro
  @Output() alRefrescar = new EventEmitter<void>();

  dispararGatilloRefresco() {
    this.alRefrescar.emit(); // Dispara la señal reactiva hacia el Dashboard Padre
  }
}
