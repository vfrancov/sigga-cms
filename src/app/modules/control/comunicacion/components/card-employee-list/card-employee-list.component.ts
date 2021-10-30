import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FilterAuthorizer, ListEmployee } from '@app/core/models/domains/employee.interface';
import { AuthorizerService, UiserviceService } from '@app/core/services/control';

@Component({
	selector: 'app-card-employee-list',
	templateUrl: './card-employee-list.component.html',
	styleUrls: ['./card-employee-list.component.scss']
})
export class CardEmployeeListComponent implements OnInit {

	@Output() employeeId = new EventEmitter();
	@Output() closeListPersonal = new EventEmitter();

	authorizerList: Array<ListEmployee> = [];
	isAuthorizer: boolean = true;
	payloadAuthorizer: FilterAuthorizer = {
		devices: true,
		page: 0,
		rows: 10,
		download: false
	}

	error: any;
	response: any;
	selectedRow: number = 0;

	constructor(private authorizers: AuthorizerService, private ui: UiserviceService) { }

	ngOnInit() {
		this.getAllAuthorizers();
		this.getState();
	}

	getState() {
		this.ui.getObservable().subscribe((data) => {
			if (data.unchecked) {
				this.closePersonalList();
				this.getAllAuthorizers();
			}
		});
	}

	getAllAuthorizers() {
		this.authorizers.getListEmployees(this.payloadAuthorizer).subscribe((response) => {
			this.authorizerList = response.body.list;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	setUsersId(employees: ListEmployee) {
		this.employeeId.emit(employees);
		this.selectedRow = employees.id;
		this.ui.setData(employees);
	}

	closePersonalList() {
		this.closeListPersonal.emit(true);
		this.selectedRow = 0;
	}
}
