import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-modificar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-modificar.html',
  styleUrls: ['./form-modificar.scss'],
})
export class FormModificar {
  @Output() alGuardarModificacion = new EventEmitter<any>();
  @Output() alCancelarModificacion = new EventEmitter<void>();

  public busquedaCodigo: string = '';
  public entidadEncontrada: boolean = false;

  // 🟢 MODELO EXPANDIDO CRM Y SAP REAL ESTATE INTEGRADO
  public entidadModificada = {
    tipoEntidad: 'padre' as 'padre' | 'hijo',
    codigo: '',
    nombre: '',
    telefono: '',
    contacto: '',
    direccion: '',
    correos: [''] as string[], // Arreglo dinámico de strings para correos
    condicionPago: 'credito',
    diasCredito: 30,
    observaciones: '',
  };

  buscarEntidadEnPool() {
    if (!this.busquedaCodigo.trim()) {
      alert('⚠️ Por favor ingresa un NIT o Código válido para buscar.');
      return;
    }

    this.entidadEncontrada = true;
    this.entidadModificada.codigo = this.busquedaCodigo;

    // Simulación de precarga de datos existentes
    if (this.busquedaCodigo === '814526-7') {
      this.entidadModificada.tipoEntidad = 'padre';
      this.entidadModificada.nombre = 'Corporación Alimentos del Sur, S.A.';
      this.entidadModificada.telefono = '2201-4500';
      this.entidadModificada.contacto = 'Licda. María Ordóñez';
      this.entidadModificada.direccion = 'Km 14.5 Carretera a El Salvador, Guatemala';
      this.entidadModificada.correos = [
        'cobros@alimentosdelsur.com',
        'facturacion@alimentosdelsur.com',
      ];
    } else {
      this.entidadModificada.tipoEntidad = 'hijo';
      this.entidadModificada.nombre = 'Entidad del Pool Local';
      this.entidadModificada.telefono = '';
      this.entidadModificada.contacto = '';
      this.entidadModificada.direccion = '';
      this.entidadModificada.correos = [''];
    }
    alert('✅ Datos maestros precargados para modificación.');
  }

  alternarTipoEntidad() {
    this.entidadModificada.tipoEntidad =
      this.entidadModificada.tipoEntidad === 'padre' ? 'hijo' : 'padre';
  }

  // 🟢 MÓDULO DE MATRIZ DE CORREOS DINÁMICOS
  agregarCorreo() {
    if (this.entidadModificada.correos.length < 3) {
      this.entidadModificada.correos.push('');
    }
  }

  removerCorreo(index: number) {
    if (this.entidadModificada.correos.length > 1) {
      this.entidadModificada.correos.splice(index, 1);
    }
  }

  dispararGuardadoModificacion() {
    if (!this.entidadModificada.nombre.trim() || !this.entidadModificada.codigo.trim()) {
      alert('⚠️ Los campos Nombre y Código/NIT son requeridos para la base de datos.');
      return;
    }
    this.alGuardarModificacion.emit({ ...this.entidadModificada });
  }

  notificarCancelacion() {
    this.alCancelarModificacion.emit();
  }
}
