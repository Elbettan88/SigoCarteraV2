import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matriz-cartera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matriz-cartera.html',
  styleUrls: ['./matriz-cartera.scss'],
})
export class MatrizCartera {
  @Input() datos: any[] = [];
  @Input() moneda: string = 'GTQ';

  facturaSeleccionada: any = null;

  seleccionarFilaInterna(cliente: any, marca: any, factura: any) {
    this.facturaSeleccionada = factura;
  }

  // 🧮 MÉTODOS REQUERIDOS: Escanean las marcas y suman los saldos según la divisa activa
  obtenerTotalPorMoneda(cliente: any, rango: string, monedaActiva: string): number {
    let sumatoria = 0;
    if (!cliente.marcas) return 0;

    cliente.marcas.forEach((m: any) => {
      if (m.facturas) {
        m.facturas.forEach((f: any) => {
          if (f.moneda === monedaActiva) {
            if (rango === 'total') sumatoria += f.saldo;
            if (rango === 'r1' && f.dias_vencidos <= 30) sumatoria += f.saldo;
            if (rango === 'r2' && f.dias_vencidos > 30 && f.dias_vencidos <= 60)
              sumatoria += f.saldo;
            if (rango === 'r3' && f.dias_vencidos > 60 && f.dias_vencidos <= 90)
              sumatoria += f.saldo;
            if (rango === 'critico' && f.dias_vencidos > 90) sumatoria += f.saldo;
          }
        });
      }
    });
    return sumatoria;
  }

  obtenerTotalMarcaPorMoneda(marca: any, rango: string, monedaActiva: string): number {
    let sumatoria = 0;
    if (!marca.facturas) return 0;

    marca.facturas.forEach((f: any) => {
      if (f.moneda === monedaActiva) {
        if (rango === 'total') sumatoria += f.saldo;
        if (rango === 'r1' && f.dias_vencidos <= 30) sumatoria += f.saldo;
        if (rango === 'r2' && f.dias_vencidos > 30 && f.dias_vencidos <= 60) sumatoria += f.saldo;
        if (rango === 'r3' && f.dias_vencidos > 60 && f.dias_vencidos <= 90) sumatoria += f.saldo;
        if (rango === 'critico' && f.dias_vencidos > 90) sumatoria += f.saldo;
      }
    });
    return sumatoria;
  }
}
