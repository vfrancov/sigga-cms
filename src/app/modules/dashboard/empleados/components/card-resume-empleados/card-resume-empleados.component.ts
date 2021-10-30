import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataEmployee, Employee, FilterEmployee } from '@app/core/models/domains/employee.interface';
import { EmployeesService } from '@app/core/services/dashboard';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';
import { CardState } from '@app/stores/card/app.card.state';
import { resumeEmployee } from '@app/stores/card/card.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-card-resume-empleados',
	templateUrl: './card-resume-empleados.component.html',
	styleUrls: ['./card-resume-empleados.component.scss']
})
export class CardResumeEmpleadosComponent implements OnInit {

	dataResumeEmployee: Array<DataEmployee> = [];
	loadDetalleEmpleados: boolean = false;
	fileName: string;
	fileResponse: any;
	defaultFilter: FilterEmployee = {
		rows: 100,
		page: 0,
		download: false
	}

	constructor(
		private employee: EmployeesService,
		private http: HttpClient,
		private localstorage: LocalstorageService,
		private store: Store<CardState>) { }

	ngOnInit() {
		this.showResumeEmployee();
	}

	showResumeEmployee() {
		this.loadDetalleEmpleados = true;

		this.employee.getListEmployees(this.defaultFilter, 0).subscribe((response) => {
			this.dataResumeEmployee = response.list;
			this.loadDetalleEmpleados = false;
			this.defaultFilter.rows = parseInt(response.records);
		}, (error: HttpErrorResponse) => {
			console.log(error);
		});
	}

	closeDetailsInOut() {
		this.store.dispatch(resumeEmployee({ show: false, card: '' }));
	}

	exportExcel() {
		this.defaultFilter.download = true;

		this.employee.exportExcel(this.defaultFilter).subscribe((response: HttpResponse<Employee>) => {

			this.fileName = response.body.fileName.split('/')[5];
			this.downloadFile();

		}, (error: HttpErrorResponse) => {
			console.log(error);
		});
	}

	downloadFile() {
		this.employee.downloadFile(this.fileName).subscribe((response) => {
			this.downloadList(response, 'empleados');
		});
	}

	getRawData(url: string): Observable<any> {
		const api = url;
		return this.http.get(api, {
			responseType: 'text', headers: {
				'Access-Control-Allow-Method': '*',
				'Access-Control-Allow-Origin': '*',
				'Authorization': `Bearer ${this.localstorage.getToken()}`
			}
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
}
