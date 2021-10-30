import { Component, OnInit } from '@angular/core';
import { ListEmployee } from '@app/core/models/domains/employee.interface';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexEntrysComponent implements OnInit {

	formRequest: boolean = false;
	employeeRecord: ListEmployee;

	constructor() { }

	ngOnInit() {
	}

	getDataEmployee(record: ListEmployee) {
		this.employeeRecord = record;
	}

	showFormRequest(event) {
		this.formRequest = event;
	}

	closeFormRequest(event) {
		this.formRequest = event;
	}
}
