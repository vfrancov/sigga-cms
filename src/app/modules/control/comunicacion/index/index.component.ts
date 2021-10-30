import { Component, OnInit } from '@angular/core';
import { ListEmployee } from '@app/core/models/domains/employee.interface';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComunicacionComponent implements OnInit {

	hideTablePublish: boolean = true;
	hideEmployees: boolean = true;
	hidePersonalList: boolean = true;
	hideNotifications: boolean = false;
	employeeRecord: ListEmployee;

	constructor() { }

	ngOnInit() {

	}

	formOpenPublish(event) {
		this.hideTablePublish = event;
	}

	formClosePublish(event) {
		this.hideTablePublish = event;
	}

	openEmployeeList(event) {
		if (parseInt(event) === 1) {
			this.hideNotifications = false;
			this.hidePersonalList = true;
		}
		else {
			this.hideNotifications = true;
			this.hidePersonalList = false;
		}
	}

	setEmployeeId(employee: ListEmployee) {
		this.employeeRecord = employee;
	}

	closePersonalList(event) {
		this.hidePersonalList = event;
		this.hideNotifications = false;
	}
}
