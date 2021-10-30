import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee, FilterAuthorizer, ListEmployee } from '@app/core/models/domains/employee.interface';
import { AuthorizerService } from '@app/core/services/control';
@Component({
	selector: 'app-card-authorizer-list',
	templateUrl: './card-authorizer-list.component.html',
	styleUrls: ['./card-authorizer-list.component.scss']
})
export class CardAuthorizerListComponent implements OnInit {

	@Output() requestForm = new EventEmitter();
	@Output() dataEmployee = new EventEmitter();

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
	selectedOption: number = 0;

	constructor(private authorizers: AuthorizerService) { }

	ngOnInit() {
		this.getAllAuthorizers();
	}

	getAllAuthorizers() {
		this.authorizers.getListEmployees(this.payloadAuthorizer).subscribe((response) => {
			this.authorizerList = response.body.list;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	showOption(record: ListEmployee) {
		this.selectedOption = record.id;
	}

	showRequestForm(record: ListEmployee) {
		this.requestForm.emit(true);
		this.dataEmployee.emit(record);
	}
}
