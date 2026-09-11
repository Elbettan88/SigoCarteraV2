import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historico-facturas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico-facturas.html',
  styleUrls: ['./historico-facturas.scss'],
})
export class HistoricoFacturas implements OnInit {
  public logFacturas: any[] = [];

  ngOnInit() {
    // Dataset histórico de auditoría plano e inmutable
    this.logFacturas = [
      {
        fecha_registro: '11/09/2026',
        no_documento: 'FEL-4501',
        entidad: 'Corporación Alimentos del Sur, S.A.',
        moneda: 'GTQ',
        monto: 15000.0,
        estado: 'CORRIENTE',
        gestor: 'Administrador Sigo',
      },
      {
        fecha_registro: '11/09/2026',
        no_documento: 'FEL-4502',
        entidad: 'Corporación Alimentos del Sur, S.A.',
        moneda: 'GTQ',
        monto: 8500.0,
        estado: 'VENCIDO',
        gestor: 'Administrador Sigo',
      },
      {
        fecha_registro: '11/09/2026',
        no_documento: 'FEL-4503',
        entidad: 'Corporación Alimentos del Sur, S.A.',
        moneda: 'USD',
        monto: 2400.0,
        estado: 'CRÍTICO',
        gestor: 'Auditor Central',
      },
      {
        fecha_registro: '10/09/2026',
        no_documento: 'FEL-8890',
        entidad: 'Importadora Eléctrica, S.A.',
        moneda: 'GTQ',
        monto: 34000.0,
        estado: 'VENCIDO',
        gestor: 'Gestor Norte',
      },
      {
        fecha_registro: '09/09/2026',
        no_documento: 'FEL-8891',
        entidad: 'Importadora Eléctrica, S.A.',
        moneda: 'USD',
        monto: 1150.0,
        estado: 'CORRIENTE',
        gestor: 'Administrador Sigo',
      },
    ];
  }
}
