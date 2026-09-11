import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { KpiCards } from './kpi-cards/kpi-cards';
import { ActionBar } from './action-bar/action-bar';
import { MatrizCartera } from './matriz-cartera/matriz-cartera';
import { RefreshButton } from './refresh-button/refresh-button';
import { ExcelButton } from './excel-button/excel-button';

@Component({
  selector: 'app-dashboard-v2',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    KpiCards,
    ActionBar,
    MatrizCartera,
    RefreshButton,
    ExcelButton,
  ],
  templateUrl: './dashboard-v2.html',
  styleUrls: ['./dashboard-v2.scss'],
})
export class DashboardV2 implements OnInit {
  private route = inject(ActivatedRoute);

  tableroActivo = signal<'GTQ' | 'USD' | 'CONSOLIDADO'>('GTQ');
  textoBusqueda = signal<string>('');

  esModoResumen: boolean = true;
  monedaVista: string = 'CONSOLIDADO';

  carteraOriginal: any[] = [];
  carteraFiltradaV2: any[] = [];

  kpis = {
    saldoVivo: 57500.0,
    pagosRecibidos: 12400.0,
    porcentajeRecuperacion: 17.7,
    saldoCritico: 2400.0,
  };

  ngOnInit() {
    // Dataset original transaccional de la cartera (Pool unificado base)
    this.carteraOriginal = [
      {
        nit: '814526-7',
        razon_social: 'Corporación Alimentos del Sur, S.A.',
        expandido: true,
        marcas: [
          {
            codigo_hijo: 'MARC-001',
            nombre_marca: 'Logística Central',
            expandido: true,
            facturas: [
              { no_factura: 'FAC-4501', moneda: 'GTQ', saldo: 15000.0, dias_vencidos: 12 },
              { no_factura: 'FAC-4502', moneda: 'GTQ', saldo: 8500.0, dias_vencidos: 45 },
              { no_factura: 'FAC-4503', moneda: 'USD', saldo: 2400.0, dias_vencidos: 135 },
            ],
          },
        ],
      },
      {
        nit: '334981-2',
        razon_social: 'Importadora Eléctrica, S.A.',
        expandido: true,
        marcas: [
          {
            codigo_hijo: 'MARC-002',
            nombre_marca: 'Mayoreo Departamental',
            expandido: true,
            facturas: [
              { no_factura: 'FAC-8890', moneda: 'GTQ', saldo: 34000.0, dias_vencidos: 75 },
              { no_factura: 'FAC-8891', moneda: 'USD', saldo: 1150.0, dias_vencidos: 5 },
            ],
          },
        ],
      },
    ];

    // Escucha reactiva de los parámetros de enrutamiento
    this.route.params.subscribe((params) => {
      const monedaParam = params['moneda'];
      this.esModoResumen = this.route.snapshot.data['modoResumen'] ?? false;

      if (this.esModoResumen) {
        this.monedaVista = 'CONSOLIDADO';
        this.tableroActivo.set('CONSOLIDADO');
      } else {
        this.monedaVista = monedaParam ?? 'GTQ';
        this.tableroActivo.set(this.monedaVista as any);

        if (this.monedaVista === 'USD') {
          this.kpis.saldoVivo = 3550.0;
          this.kpis.pagosRecibidos = 1150.0;
          this.kpis.porcentajeRecuperacion = 32.4;
          this.kpis.saldoCritico = 2400.0;
        } else {
          this.kpis.saldoVivo = 57500.0;
          this.kpis.pagosRecibidos = 12400.0;
          this.kpis.porcentajeRecuperacion = 17.7;
          this.kpis.saldoCritico = 2400.0;
        }
      }
      this.recalcularMatrizV2();
    });
  }

  filtrarMatrizV2() {
    this.recalcularMatrizV2();
  }

  // 🧮 MOTOR DE RECALCULO DE REJILLA: Sincronizado al 100% con Señales Reactivas de Angular 18
  recalcularMatrizV2() {
    const busqueda = this.textoBusqueda().toLowerCase().trim();
    const moneda = this.tableroActivo();

    this.carteraFiltradaV2 = this.carteraOriginal
      .map((cliente) => {
        const marcasFiltradas = cliente.marcas.map((marca: any) => {
          // Filtrar documentos por la divisa activa
          const facturasFiltradas = marca.facturas.filter(
            (f: any) => moneda === 'CONSOLIDADO' || f.moneda === moneda,
          );

          return { ...marca, facturas: facturasFiltradas };
        });

        return { ...cliente, marcas: marcasFiltradas };
      })
      .filter((c) => {
        const tieneFacturas = c.marcas.some((m: any) => m.facturas.length > 0);
        const coincideBusqueda =
          c.nit.toLowerCase().includes(busqueda) || c.razon_social.toLowerCase().includes(busqueda);
        return tieneFacturas && coincideBusqueda;
      });
  }

  // 🧮 GATILLO CONECTADO: Recibe la señal del componente hijo de refresco y recalcula la rejilla
  forzarRefrescoCarteraV2() {
    this.carteraFiltradaV2 = [];

    setTimeout(() => {
      this.recalcularMatrizV2();
      console.log(
        `[SigoCartera V2] Datos de división ${this.monedaVista} actualizados mediante componente atómico.`,
      );
    }, 50);
  }

  // 📥 PUENTE DE CONTROL: Lanza de forma automatizada las descargas desde la barra de acciones
  descargarExcelDesdePadreV2() {
    alert('📥 Generando reporte de auditoría premium .xlsx en base a la matriz transaccional...');
  }

  // 🧮 BUS DE DATOS EN CALIENTE RESTRUCTURADO PROFUNDO: Inserta históricamente la factura y actualiza la rejilla viva
  inyectarNuevaFacturaEnMemoriaV2(nuevaFactura: any) {
    const desglose = {
      no_factura: `${nuevaFactura.serie}-${nuevaFactura.numero}`,
      moneda: nuevaFactura.moneda,
      saldo: Number(nuevaFactura.monto),
      dias_vencidos: 15,
    };

    let facturaInyectadaConExito = false;

    this.carteraOriginal.forEach((cliente) => {
      if (cliente.marcas) {
        cliente.marcas.forEach((marca: any) => {
          if (
            cliente.nit === nuevaFactura.codigoCliente ||
            marca.codigo_hijo === nuevaFactura.codigoCliente
          ) {
            if (!marca.facturas) {
              marca.facturas = [];
            }
            marca.facturas.unshift(desglose);
            facturaInyectadaConExito = true;
          }
        });
      }
    });

    if (facturaInyectadaConExito) {
      this.recalcularMatrizV2();
      alert(
        `✅ Factura ${desglose.no_factura} inyectada y fijada con éxito en el histórico de la cartera.`,
      );
    } else {
      alert('⚠️ Código de Entidad (NIT o Marca) no encontrado en el pool local actual.');
    }
  }
}
