import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReportesService } from '@app/core/services/dashboard';

@Component({
	selector: 'app-general',
	templateUrl: './general.component.html',
	styleUrls: ['./general.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom
})
export class GeneralComponent implements OnInit {

	private gridApi;
	private gridColumnApi;

	public modules: any[] = [];
	columnDefs;
	defaultColDef;
	rowData;
	gridOptions: any;
	private frameworkComponents;
	firstData: any;
	error: any;
	fileName: string;
	buttonDownload: string = 'Exportar a Excel';

	title = 'my-app';

	constructor(
		private reports: ReportesService
	) {
		this.gridOptions = {
			columnDefs: [
				{ field: 'numDocument', headerName: 'Cedula', filter: true },
				{ field: 'fullName', headerName: 'Nombres Completos' },
				{ field: 'sedeName', headerName: 'Sede' },
				{ field: 'officeName', headerName: 'Oficina' },
				{ field: 'terminalName', headerName: 'Terminal' },
				{ field: 'Ruta', headerName: 'Ruta' },
				{ field: 'dateEntryAt', headerName: 'Entrada' },
				{ field: 'dateExitAt', headerName: 'Salida' },
				{
					field: 'symptoms',
					headerName: 'Sintomas',
					cellRenderer : function(params) {
						return (params.data.symptoms) ? 'Si' : 'No';
					}},
				{ field: 'typeUser', headerName: 'Tipo' }
			],
			defaultColDef: {
				filter: 'agTextColumnFilter',
				editable: true,
				floatingFilter: true,
				resizable: true,
				pagination: true
			},
			defaultColGroupDef: {
				marryChildren: true,
			},
			columnTypes: {
				numberColumn: { filter: 'agNumberColumnFilter' },
				medalColumn: { columnGroupShow: 'open', filter: false },
				nonEditableColumn: { editable: false }
			},
			rowSelection: 'multiple',
			rowGroupPanelShow: 'always',
			pivotPanelShow: 'always',
			enableRangeSelection: true,
			paginationPageSize: 15,
			pagination: true,
			rowData: null
		};
	}

	ngOnInit() {
		this.getFirstData();
	}

	getFirstData() {
		let request = {
			page: 0,
			rows: 0,
			download: false
		}

		this.reports.general(request).subscribe((response) => {
			this.rowData = response.body.list;
		}, (error: HttpErrorResponse) => {
			this.error = error;
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

	sintomas(params) {

	}
}
