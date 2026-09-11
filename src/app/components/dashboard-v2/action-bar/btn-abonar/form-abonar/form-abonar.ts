import { Component, Output, EventEmitter } from '@angular/core'; // 🟢 REFERENCIAS DE ENLAZADO RESTAURADAS
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-abonar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-abonar.html',
  styleUrls: ['./form-abonar.scss'],
})
export class FormAbonar {
  @Output() alGuardarAbono = new EventEmitter<any>();
  @Output() alCancelarAbono = new EventEmitter<void>();

  // Registro internacional unificado con soporte para bancos de Guatemala y bitácora manual
  public abono = {
    banco: 'BI',
    noDocumento: '',
    fechaPago: new Date().toISOString().split('T'),
    fechaAplicacion: new Date().toISOString().split('T'),
    codigoCliente: '',
    noFactura: '',
    moneda: 'GTQ',
    tipoAplicacion: 'parcial' as 'parcial' | 'total',
    tipoPago: 'transferencia',
    origenExtranjero: '',
    observaciones: '',
    monto: null as number | null,
  };

  dispararGuardadoAbono() {
    if (
      !this.abono.noDocumento ||
      !this.abono.monto ||
      !this.abono.noFactura ||
      !this.abono.codigoCliente
    ) {
      alert('⚠️ Por favor completa los campos criticos de la transaccion.');
      return;
    }

    if (this.abono.tipoPago.includes('extranjero') && !this.abono.origenExtranjero.trim()) {
      alert('⚠️ Por favor ingresa el nombre del Banco o Plataforma del extranjero.');
      return;
    }

    this.alGuardarAbono.emit({ ...this.abono });
  }

  notificarCancelacion() {
    this.alCancelarAbono.emit();
  }
}
