import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { statusCode } from '@app/core/constants/status.responses';
import { Filter } from '@app/core/models/domains/office.interface';
import { ExitVisitor, RequestAuthorization, Visitors } from '@app/core/models/domains/visitors.interface';
import { AuthorizerService } from '@app/core/services/control';
import { EmployeesService, SocketService } from '@app/core/services/dashboard';

@Component({
	selector: 'app-card-visits-list',
	templateUrl: './card-visits-list.component.html',
	styleUrls: ['./card-visits-list.component.scss']
})
export class CardVisitsListComponent implements OnInit, OnChanges {

	@Input() statusShowList: boolean = false;

	visitorsRecords: Array<Visitors> = [];
	defaultFilter: Filter = {
		page: 0,
		rows: 200,
		download: true
	}

	error: any;
	response: any;
	fileName: string;

	constructor(private authorizers: AuthorizerService, private employee: EmployeesService, private socket: SocketService) { }

	ngOnInit() {
		this.getListVisitors();
		this.checkEvent('iosolicitudes');
	}

	ngOnChanges(changes: SimpleChanges) {
		if (!this.statusShowList)
			this.getListVisitors();
	}

	checkEvent(event) {
		this.socket.on(event).subscribe((data) => {
			this.getListVisitors();
		})
	}

	getListVisitors() {
		this.authorizers.getListVisitors(this.defaultFilter).subscribe((response) => {
			this.visitorsRecords = response.body.list;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	exportToExcel() {
		this.defaultFilter.download = true;

		this.authorizers.getListVisitors(this.defaultFilter).subscribe((response) => {
			this.fileName = response.body.fileName.split('/')[5];
			this.downloadFile();
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	downloadFile() {
		this.employee.downloadFile(this.fileName).subscribe((response) => {
			this.downloadList(response, 'resumen_autorizados');
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

	goOut(record: Visitors) {
		this.authorizers.giveOut(record.visitorId).subscribe((response) => {
			if (response.status === statusCode.SUCCESS)
				this.getListVisitors();
		}, (error: HttpErrorResponse) => {
			this.error = error;
		})
	}
}
