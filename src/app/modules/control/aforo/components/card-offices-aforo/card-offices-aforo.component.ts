import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { statusCode } from '@app/core/constants/status.responses';
import { ReportesService } from '@app/core/services/dashboard';
@Component({
	selector: 'app-card-offices-aforo',
	templateUrl: './card-offices-aforo.component.html',
	styleUrls: ['./card-offices-aforo.component.scss']
})
export class CardOfficesAforoComponent implements OnInit {

	dataAforo: any = [];
	response: any;
	error: any;

	totalCapacity: number = 0;
	totalAforo: number = 0;
	totalCapacityPersonals: number = 0;

	aforoEmployees: number = 0;
	aforoVisitors: number = 0;
	aforoContratistas: number = 0;

	constructor(private reportes: ReportesService) { }

	ngOnInit() {
		this.getDataAforo();
	}

	getDataAforo() {
		this.reportes.aforo({ page: 0, rows: 100, download: true }).subscribe((response) => {
			if (response.status === statusCode.SUCCESS) {
				this.dataAforo = response.body.list;
				this.getAforoTotals(this.dataAforo);
			}

		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	getAforoTotals(aforo: Array<any>) {
		aforo.forEach(element => {
			this.totalAforo += element.capacity;

			this.aforoEmployees += element.numEmployee;
			this.aforoVisitors += element.numVisitor;
			this.aforoContratistas += element.numContratista;

			this.totalCapacityPersonals = (this.aforoEmployees + this.aforoVisitors + this.aforoContratistas);
		});
	}
}
