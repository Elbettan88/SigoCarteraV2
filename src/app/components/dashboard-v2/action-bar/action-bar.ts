import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// INTEGRACIÓN ATÓMICA AISLADA: Importación de los componentes botón por botón
import { BtnRefrescar } from './btn-refrescar/btn-refrescar';
import { BtnModificar } from './btn-modificar/btn-modificar';
import { BtnAbonar } from './btn-abonar/btn-abonar';
import { BtnRegistrar } from './btn-registrar/btn-registrar';
import { BtnExcel } from './btn-excel/btn-excel';
import { FormAbonar } from './btn-abonar/form-abonar/form-abonar';
import { FormModificar } from './btn-modificar/form-modificar/form-modificar'; // 🟢 Formulario de modificaciones importado por separado

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BtnRefrescar,
    BtnModificar,
    BtnAbonar,
    BtnRegistrar,
    BtnExcel,
    FormAbonar,
    FormModificar, // 🟢 Registrado de forma aislada e independiente en la metadata
  ],
  templateUrl: './action-bar.html',
  styleUrls: ['./action-bar.scss'],
})
export class ActionBar {
  @Output() alRefrescar = new EventEmitter<void>();
  @Output() alDescargarExcel = new EventEmitter<void>();
  @Output() alAgregarFactura = new EventEmitter<any>();
  @Output() alAplicarAbono = new EventEmitter<any>();
  @Output() alAplicarModificacion = new EventEmitter<any>(); // 🟢 Canal de comunicación atómico hacia el Dashboard Padre

  // Control del estado del panel lateral deslizante (null, 'modificar', 'abonar', 'registrar')
  public panelActivo = signal<string | null>(null);

  // Objeto base del formulario de registro con propiedades contables y push circular
  public formFactura = {
    tipoEntidad: 'padre' as 'padre' | 'hijo',
    serie: '',
    numero: '',
    moneda: 'GTQ',
    monto: null as number | null,
    tipoCambio: 7.78,
    codigoCliente: '',
    nombreCliente: '',
    condicionPago: 'credito' as 'credito' | 'contado',
    fecha: new Date().toISOString().split('T'),
  };

  dispararRefresco() {
    this.alRefrescar.emit();
  }
  dispararExcel() {
    this.alDescargarExcel.emit();
  }

  abrirFormulario(tipo: string) {
    this.panelActivo.set(tipo);
  }

  cerrarFormulario() {
    this.panelActivo.set(null);
  }

  // Alternar el estado del switch circular
  alternarTipoEntidad() {
    this.formFactura.tipoEntidad = this.formFactura.tipoEntidad === 'padre' ? 'hijo' : 'padre';
  }

  evaluarTipoCambio() {
    if (this.formFactura.moneda === 'GTQ') {
      this.formFactura.tipoCambio = 1.0;
    } else {
      this.formFactura.tipoCambio = 7.78;
    }
  }

  guardarFacturaV2() {
    if (
      !this.formFactura.numero ||
      !this.formFactura.monto ||
      !this.formFactura.codigoCliente ||
      !this.formFactura.nombreCliente
    ) {
      alert(
        '⚠️ Por favor completa los campos críticos de la factura, incluyendo el Nombre del Cliente.',
      );
      return;
    }

    this.alAgregarFactura.emit({ ...this.formFactura });
    this.cerrarFormulario();
  }

  // 💵 PUENTE DEL ABONO: Recibe los datos del formulario hijo y los manda al orquestador principal
  puenteGuardarAbono(datosAbono: any) {
    this.alAplicarAbono.emit(datosAbono);
    this.cerrarFormulario();
  }

  // 🔧 PUENTE DE MODIFICACIONES: Recibe los datos de cambios en caliente y los despacha al Dashboard Maestro
  puenteGuardarModificacion(datosModificados: any) {
    this.alAplicarModificacion.emit(datosModificados);
    this.cerrarFormulario();
  }
}
