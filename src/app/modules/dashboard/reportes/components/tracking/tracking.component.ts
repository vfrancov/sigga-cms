import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { statusCode } from '@app/core/constants/status.responses';
import { ReportesService } from '@app/core/services/dashboard';

@Component({
	selector: 'app-tracking',
	templateUrl: './tracking.component.html',
	styles: []
})
export class TrackingComponent implements OnInit {

	dataTracking: any = [];

	constructor(private reportes: ReportesService) { }

	ngOnInit() {
		this.getDataTracking();
	}

	getDataTracking() {
		this.reportes.tracking({ page: 0, rows: 100, download: false }).subscribe((response) => {
			if (response.status === statusCode.SUCCESS)
				this.dataTracking = response.body.list;

		}, (error: HttpErrorResponse) => {

		});
	}
}
