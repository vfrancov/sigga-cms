import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { DataEmployee, EditEmployee, FilterEmployee, ListEmployee } from '@app/core/models/domains/employee.interface';
import { EmployeesService } from '@app/core/services/dashboard';
import { CardState } from '@app/stores/card/app.card.state';
import { resumeEmployee, setDetails, showCardEmployee, showCompany, showSedes } from '@app/stores/card/card.actions';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-card-list-empleados',
	templateUrl: './card-list-empleados.component.html',
	styleUrls: ['./card-list-empleados.component.scss']
})
export class CardListEmpleadosComponent implements OnInit {

	employeeList: Array<DataEmployee> = [];
	updateList: boolean = false;
	frmSearchEmploye: FormGroup;

	idEmployee: number = 0;
	selectedId: number = 0;
	seeDetails: number = 0;
	selectedToDelete: number = 0;
	loading: boolean = false;

	error: HttpErrorResponse;

	defaultFilter: FilterEmployee = {
		rows: 100,
		page: 0,
		download: false
	}

	constructor(
		private employee: EmployeesService,
		private formbuilder: FormBuilder,
		private store: Store<CardState>) { }

	ngOnInit() {
		this.initializeFormSearch();
		this.listEmployee();
		this.checkUpdate();
	}

	initializeFormSearch() {
		this.frmSearchEmploye = this.formbuilder.group({
			search: ['', [Validators.required]]
		})
	}

	makeSearch(event) {
		let filterValue = event.target.value;
		let employeeFilter = this.employeeList.filter((element) => element.firstName.toLocaleLowerCase().includes(filterValue)
			|| element.numDocument.toLocaleLowerCase().includes(filterValue)
			|| element.lastName.toLocaleLowerCase().includes(filterValue));

		if(filterValue === "")
			this.listEmployee();
		else
			this.employeeList = employeeFilter;
	}

	listEmployee() {
		this.loading = true;

		this.employee.getListEmployees(this.defaultFilter).subscribe((response) => {
			this.employeeList = response.list;
			this.loading = false;
		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.loading = false;
		});
	}

	checkUpdate() {
		this.store.select('lists').subscribe((data) => {
			if (data.status)
				this.listEmployee();
		});
	}

	showFormEmpleado() {
		this.store.dispatch(resumeEmployee({ show: false, card: '' }));
		this.store.dispatch(showSedes({ show: false, card: '' }))
		this.store.dispatch(showCompany({ show: false, card: '' }));
		this.store.dispatch(showCardEmployee({ show: true, card: 'formEmpleados' }));

		this.store.dispatch(setDetails({
			show: false, payload: {
				id: 0,
				typeDocumentsId: 0,
				numDocument: '',
				firstName: '',
				lastName: '',
				address: '',
				phoneNumber: '',
				email: '',
				statusName: '',
				statusId: 0,
				officeName: '',
				officeId: 0,
				arlId: 0,
				epsId: 0,
				isAuthorizer: 0
			},
			card: 'detailEmpleados'
		}))
	}

	verMisEmpleados() {
		this.store.dispatch(showSedes({ show: false, card: '' }))
		this.store.dispatch(showCompany({ show: false, card: '' }));
		this.store.dispatch(resumeEmployee({ show: false, card: '' }));
		this.store.dispatch(resumeEmployee({ show: true, card: 'resumeEmpleados' }));
	}

	seeOptions(id) {
		this.selectedId = id;
		this.seeDetails = id;
	}

	selectItem(id) {
		this.selectedToDelete = id;
	}

	requestDetails(record) {
		this.store.dispatch(resumeEmployee({ show: false, card: '' }));
		this.store.dispatch(setDetails({ show: true, payload: record, card: 'detailEmpleados' }));
	}

	cancelProcess() {
		this.selectedToDelete = 0;
	}

	deleteProcessEmpleado(record: ListEmployee) {
		let request: EditEmployee = {
			StatusId: 3,
			address: record.address,
			arlId: record.arlId,
			email: record.email,
			epsId: record.epsId,
			fname: record.firstName,
			isAuthorizer: record.isAuthorizer,
			lname: record.lastName,
			numDocument: record.numDocument,
			officesId: record.officeId,
			phoneNumber: record.phoneNumber,
			typeDocumentsId: record.typeDocumentsId,
      isResidential : 0,
      isFloating: 0
		}

		this.employee.updateEmployee(request, this.selectedToDelete).subscribe((response) => {
			if (response.status === statusCode.NO_CONTENT)
				this.listEmployee();
		});
	}
}
