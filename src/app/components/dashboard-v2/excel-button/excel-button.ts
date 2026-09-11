import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Workbook from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-excel-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excel-button.html',
  styleUrls: ['./excel-button.scss'],
})
export class ExcelButton {
  @Input() kpis: any = {};

  async generarReporteExcelDashboardV2() {
    const excelWorkbook = new Workbook.Workbook();
    const worksheet = excelWorkbook.addWorksheet('Dashboard Consolidado');

    // 🧮 Configurar anchos milimétricos automáticos de las columnas (A a E)
    worksheet.columns = [
      { width: 34, key: 'indicador' }, // Columna A
      { width: 28, key: 'quetzales' }, // Columna B
      { width: 26, key: 'dolares' }, // Columna C
      { width: 22, key: 'eficiencia' }, // Columna D
      { width: 22, key: 'estado' }, // Columna E
    ];

    // 1. Fila 1: Título Principal del Reporte Ejecutivo
    const filaTitulo = worksheet.addRow(['SIGOCARTERA V2 — PANEL DE CONTROL CONSOLIDADO']);
    filaTitulo.font = { name: 'Segoe UI', size: 15, bold: true, color: { argb: '0F172A' } };

    worksheet.addRow([
      'Reporte de Gerencia Automatizado estilo SAP Quartz',
      '',
      '',
      'Fecha:',
      new Date().toLocaleDateString(),
    ]);
    worksheet.addRow([]); // Fila vacía de separación

    // 2. Fila 4: Cabecera de la Sección de KPIs Multimoneda
    const filaSeccion1 = worksheet.addRow(['💰 BALANCE GENERAL DE KPIS MULTIMONEDA']);
    filaSeccion1.font = { name: 'Segoe UI', size: 12, bold: true };

    // 3. Fila 5: Encabezados de Columnas con Alineación Homologada (Estilo Power BI)
    const filaEncabezados = worksheet.addRow([
      'Indicador o Metrica',
      'Division Quetzales (GTQ)',
      'Division Dolares (USD)',
      'Eficiencia Global',
      'Estado',
    ]);
    filaEncabezados.eachCell((cell, colNumber) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1E293B' } };
      cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };

      // 🟢 ALINEACIÓN INTELIGENTE: Texto a la izquierda, números a la derecha, metas al centro
      if (colNumber === 1) {
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      } else if (colNumber === 2 || colNumber === 3) {
        cell.alignment = { vertical: 'middle', horizontal: 'right' };
      } else {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
    filaEncabezados.height = 24;

    // 4. Inyección de las filas de datos contables del balance
    const datosKpis = [
      [
        'SALDO VIVO ACTIVO',
        57500.0,
        3550.0,
        `${this.kpis?.porcentajeRecuperacion || 17.7}%`,
        'Vigente',
      ],
      ['COBROS RECAUDADOS', 12400.0, 1150.0, 'Promedio General', 'Meta Alcanzada'],
      ['RIESGO CRITICO (+90D)', 0.0, 2400.0, 'Auditoria Requerida', 'Alerta'],
    ];

    datosKpis.forEach((row, index) => {
      const addedRow = worksheet.addRow(row);
      addedRow.height = 20;
      const bgHex = index % 2 === 0 ? 'F1F5F9' : 'E2E8F0';

      addedRow.eachCell((cell, colNumber) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgHex } };
        cell.font = { name: 'Segoe UI', size: 10, color: { argb: '0F172A' } };
        cell.border = {
          bottom: { style: 'thin', color: { argb: 'CBD5E1' } },
          top: { style: 'thin', color: { argb: 'CBD5E1' } },
        };

        // 🟢 FORMATEO CONTABLE DE MONEDAS ESTRICTO
        if (colNumber === 2) {
          cell.numFmt = '"Q"#,##0.00'; // Formato Quetzales nativo de Excel
          cell.alignment = { horizontal: 'right' };
        } else if (colNumber === 3) {
          cell.numFmt = '"$"#,##0.00'; // Formato Dólares nativo de Excel
          cell.alignment = { horizontal: 'right' };
        } else if (colNumber === 4 || colNumber === 5) {
          cell.alignment = { horizontal: 'center' };
        }
      });
    });

    worksheet.addRow([]); // Fila vacía de separación

    // 5. Sección de Rendimiento Gráfico Horizontal
    const filaSeccion2 = worksheet.addRow(['📊 RENDIMIENTO Y CRECIMIENTO HORIZONTAL']);
    filaSeccion2.font = { name: 'Segoe UI', size: 12, bold: true };

    const filaEncabezados2 = worksheet.addRow([
      'Division Operativa',
      'Meta Financiera',
      'Logrado Real',
      '% Rendimiento Grafica',
      'Crecimiento',
    ]);
    filaEncabezados2.eachCell((cell, colNumber) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1E293B' } };
      cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };

      if (colNumber === 1) {
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      } else if (colNumber === 2 || colNumber === 3) {
        cell.alignment = { vertical: 'middle', horizontal: 'right' };
      } else {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
    filaEncabezados2.height = 24;

    const datosRendimiento = [
      ['Division Quetzales (GTQ)', 57500.0, 12400.0, '21.50%', '+4.3% Up'],
      ['Division Dolares (USD)', 3550.0, 1150.0, '32.40%', '+4.3% Up'],
    ];

    datosRendimiento.forEach((row, index) => {
      const addedRow = worksheet.addRow(row);
      addedRow.height = 20;
      const bgHex = index % 2 === 0 ? 'F1F5F9' : 'E2E8F0';

      addedRow.eachCell((cell, colNumber) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgHex } };
        cell.font = { name: 'Segoe UI', size: 10, color: { argb: '0F172A' } };

        if (colNumber === 2) {
          cell.numFmt = '#,##0.00';
          cell.alignment = { horizontal: 'right' };
        } else if (colNumber === 3) {
          cell.numFmt = '#,##0.00';
          cell.alignment = { horizontal: 'right' };
        } else if (colNumber === 4 || colNumber === 5) {
          cell.alignment = { horizontal: 'center' };
        }
      });
    });

    worksheet.addRow([]);

    // 6. Fila Final: Mensaje Ejecutivo Destacado con Combinación de Celdas A-E
    const numeroFilaInsignia = worksheet.lastRow ? worksheet.lastRow.number + 1 : 15;
    worksheet.mergeCells(`A${numeroFilaInsignia}:E${numeroFilaInsignia}`); // 🟢 COMBINAR CELDAS EN BLOQUE

    const filaInsignia = worksheet.getRow(numeroFilaInsignia);
    filaInsignia.getCell(1).value =
      '🚀 EFICIENCIA CORPORATIVA GENERAL SUBIO +4.3% RESPECTO AL MES ANTERIOR';
    filaInsignia.getCell(1).font = {
      name: 'Segoe UI',
      size: 11,
      bold: true,
      color: { argb: '0F172A' },
    };
    filaInsignia.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'CBD5E1' },
    };
    filaInsignia.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    filaInsignia.height = 26;

    // 7. Generar descarga binaria nativa
    const buffer = await excelWorkbook.xlsx.writeBuffer();
    const blobFinal = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blobFinal, `SigoCartera_Dashboard_Executive_Premium.xlsx`);
  }
}
