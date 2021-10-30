import { Component, OnInit } from '@angular/core';
import { CompanyService, EmployeesService } from '@app/core/services/dashboard';

@Component({
	selector: 'app-card-visit-contratistas',
	templateUrl: './card-visit-contratistas.component.html',
	styleUrls: ['./card-visit-contratistas.component.scss']
})
export class CardVisitContratistasComponent implements OnInit {

	resumeEntryExits: Array<any> = [];
	fileName: string;
	pageNumber: number = 1;
	totalPages: number = 0;

	constructor(private companie: CompanyService, private employee: EmployeesService) { }

	ngOnInit() {
		this.readEntryAndExits(0);
	}

	readEntryAndExits(page: number) {
		this.companie.entrysAndExits({ page: page, rows: 10, download: true }, 'api/Report/EntryExitContratista').subscribe((response) => {
			this.resumeEntryExits = response.body.list;
			this.totalPages = parseInt(response.body.pages);
		});
	}

	next() {
		if(this.pageNumber === this.totalPages)
			return;
		else {
			this.pageNumber++;
			this.readEntryAndExits(this.pageNumber);
		}
	}

	prev() {
		if (this.pageNumber === 1)
			return;
		else {
			this.pageNumber--;
			this.readEntryAndExits(this.pageNumber);
		}
	}

	downloadFile() {
		this.companie.entrysAndExits({ page: 0, rows: 0, download: true }, 'api/Report/EntryExitContratista').subscribe((response) => {
			this.fileName = response.body.fileName.split('/')[5];

			this.employee.downloadFile(this.fileName).subscribe((response) => {
				this.downloadList(response, 'resumen_entrada-salidas-contratistas');
			});
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
