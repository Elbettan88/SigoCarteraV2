import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-cards.html',
  styleUrls: ['./kpi-cards.scss'],
})
export class KpiCards {
  @Input() tablero: string = 'GTQ';

  // 🟢 Recibe el estado dinámico recalculado del padre desde el orquestador
  @Input() kpis: any = {
    saldoVivo: 0,
    pagosRecibidos: 0,
    porcentajeRecuperacion: 0,
    saldoCritico: 0,
  };
}
