import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Combo } from '@app/core/models/domains/combo.interface';
import { EmployeesService, ReportesService } from '@app/core/services/dashboard';
import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexReportesComponent implements OnInit {

  /** Config DataGrid Component Inputs */
  reportTitle: string = 'Reporte General';
  description: string = 'Con este gestor de reportes, podras consultar la información general de tus visitas';

  config: any = {};
  endpoint: string = '';

  cols: any[];
  first = 0;
  rows = 0;
  loading = false;
  buttonDownload: string = 'Exportar';
  fileName: string = '';

  rowData: Array<any> = [];
  error: HttpErrorResponse;
  pages: number;
  records: number;
  lastEvent: LazyLoadEvent;
  comboOficinas: Combo[];
  comboSedes: Combo[];
  selectedOffice: string[];
  selectedSede: string[];

  constructor(private reports: ReportesService, private employee: EmployeesService) { }

  ngOnInit() {
    this.cols = [
      { field: 'numDocument', header: 'Cédula' },
      { field: 'fullName', header: 'Nombres Completos' },
      { field: 'sedeName', header: 'Sede' },
      { field: 'officeName', header: 'Oficina' },
      { field: 'terminalName', header: 'Terminal' },
      { field: 'entryAt', header: 'Entrada' },
      { field: 'exitAt', header: 'Salida' },
      { field: 'symptoms', header: 'Sintomas' },
      { field: 'typeUser', header: 'Tipo de Usuario' }
    ]
    this.employee.combos('/api/ComboBoxGeneral/GetOffices').subscribe((result) => {
      this.comboOficinas = result;
    });

    this.employee.combos('/api/ComboBoxGeneral/GetSedes').subscribe((result) => {
      this.comboSedes = result;
    });

    this.getFirstData();
    //3012871719 - 99992824244
  }

  getFirstData() {
    let request = {
      page: 0,
      rows: 10,
      filter: [],
      download: false,
      sort: [{ field: "entryAt", dir: "desc" }],
      order: "desc"
    }

    this.loading = true;

    this.reports.general(request).subscribe((response) => {
      this.rowData = response.body.list;
      this.pages = parseInt(response.body.pages);
      this.records = parseInt(response.body.records);
      this.rows = this.records;
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.error = error;
      this.loading = false;
    });
  }

  exportExcel() {
    this.buttonDownload = 'Descargando ...';

    let request = {
      page: 0,
      rows: 0,
      download: true
    }

    this.reports.general(request).subscribe((response) => {

      this.fileName = response.body.fileName.split('/')[5];
      this.downloadFile();
      this.buttonDownload = 'Exportar a Excel';

    }, (error: HttpErrorResponse) => {
      this.buttonDownload = 'Exportar a Excel';
    });
  }

  downloadFile() {
    this.reports.downloadFile(this.fileName).subscribe((response) => {
      this.downloadList(response, 'ReporteGeneral');
    });
  }

  downloadList(response: any, filename: string) {
    let dataType = response.type;
    let binaryData = [];
    binaryData.push(response);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));

    if (filename)
      downloadLink.setAttribute('download', filename + '.xlsx');

    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  loadRecords(event: LazyLoadEvent): void {
    let page = event.first / event.rows + 1
    this.lastEvent = event;

    if (JSON.stringify(this.lastEvent) === JSON.stringify(event)) {
      this.currentPage(page, event);
    } else {
      this.currentPage(page, event);
    }
  }

  currentPage(page, filters: LazyLoadEvent) {
    if (Object.keys(filters.filters).length === 0)
      return;

    let getFilters = [];

    Object.keys(filters.filters).forEach((prop, index) => {
      if (filters.filters[prop][0].value !== null) {
        let value = filters.filters[prop][0].value;
        let dateValue = new Date(value);
        let resultDate = '';
        console.log(value);

        if (value instanceof Date) {
          console.log('here');
          resultDate = `${dateValue.getFullYear().toString()}-${dateValue.getMonth() + 1}-${dateValue.getDate()} 00:00:00`;
          getFilters.push({
            "field": prop,
            "operator": "gte",
            "value": resultDate,
            "logic": "and"
          });
        } else {
          getFilters.push({
            "field": prop,
            "operator": "eq",
            "value": (typeof value === "object") ? value[0]?.prop : value,
            "logic": "and"
          });
        }
      }
    });

    let request = {
      page: page,
      rows: 10,
      download: false,
      filter: getFilters,
      sort: (getFilters.length <= 0) ? [{ field: "entryAt", dir: "desc" }] : [],
      order: "desc"
    }

    this.loading = true;

    this.reports.general(request).subscribe((response) => {
      this.rowData = response.body.list;
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.error = error;
      this.loading = false;
    });
  }
}
