import { Component, OnInit } from '@angular/core';
import { CompanyService, EmployeesService } from '@app/core/services/dashboard';

@Component({
	selector: 'app-card-visits-offices',
	templateUrl: './card-visits-offices.component.html',
	styleUrls: ['./card-visits-offices.component.scss']
})
export class CardVisitsOfficesComponent implements OnInit {

	officeVisits: any = [];
	employees: number = 0;
	visitors: number = 0;
	contratistas: number = 0;
	pageNumber: number = 0;
	fileName: string = "";
	totalPages: number = 0;

	constructor(private companie: CompanyService, private employee: EmployeesService) { }

	ngOnInit() {
		this.readAllVisits(this.pageNumber);
	}

	readAllVisits(page: number) {
		this.companie.readAllVisits({ page: page, rows: 20, download: true }).subscribe((response) => {
			this.officeVisits = response.body.list;

      if(response.body.fileName !== null)
			  this.fileName = response.body.fileName.split('/')[5];

			this.employees = this.officeVisits.filter(employe => employe.typeUser === "Empleado").length;
			this.visitors = this.officeVisits.filter(visitor => visitor.typeUser === "Visitantes").length;
			this.contratistas = this.officeVisits.filter(visitor => visitor.typeUser === "Contratista").length;
		});
	}

	next() {
		if(this.pageNumber > this.totalPages)
			return;
		else {
			this.pageNumber++;
			this.readAllVisits(this.pageNumber);
			console.log(this.pageNumber);
		}
	}

	prev() {
		if (this.pageNumber === 0)
			return;
		else {
			this.pageNumber--;
			this.readAllVisits(this.pageNumber);
			console.log(this.pageNumber);
		}
	}

	downloadFile() {
		this.companie.readAllVisits({ page: 0, rows: 0, download: true }).subscribe((response) => {
			this.officeVisits = response.body.list;
			this.fileName = response.body.fileName.split('/')[5];
			this.totalPages = parseInt(response.body.pages);

			this.employee.downloadFile(this.fileName).subscribe((response) => {
				this.downloadList(response, 'resumen_visitantes');
			});
		});

	}

	downloadList(response: any, filename: string) {
		console.log(response);
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
