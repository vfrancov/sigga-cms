import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataEmployee, Employee, FormEmployee } from '@app/core/models/domains/employee.interface';
import { EmployeeEntryExit } from '@app/core/models/domains/visitors.interface';
import { EmployeesService } from '@app/core/services/dashboard';
import { CardState } from '@app/stores/card/app.card.state';
import { reloadList, setDetails } from '@app/stores/card/card.actions';
import { Store } from '@ngrx/store';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';

@Component({
	selector: 'app-card-employee-detail',
	templateUrl: './card-employee-detail.component.html',
	styleUrls: ['./card-employee-detail.component.scss']
})
export class CardEmployeeDetailComponent implements OnInit {

	@Output() showEditForm = new EventEmitter();

	detailsEmployee: DataEmployee;
	showDetails: boolean = false;
	show: boolean = false;
  toggle: boolean = false;

	constructor(private store: Store<CardState>, private employee: EmployeesService) { }

	ngOnInit() {
		this.setDataEmployee();
	}

	setDataEmployee() {
		this.store.select('showDetailsEmployee').subscribe((data) => {
			this.showDetails = data.show;
			this.detailsEmployee = data.payload;
		});
	}

	editEmpleado() {
		this.showEditForm.emit(true);
	}

	cancelDetail() {
		this.store.dispatch(setDetails({
			show: false,
			payload: {
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
				epslId: 0,
				isAuthorizer: 0
			},
			card: 'detailEmpleados'
		}));
	}

	activateEmpleado(detailEmployee: DataEmployee) {
    this.toggle = !this.toggle;
    let status = (this.toggle) ? 2 : 1;

    this.employee.activateOrInactivateEmployee(detailEmployee.id, status).subscribe(response => {
      this.store.dispatch(reloadList({ status: true, card: '' }));
    });
	}

	editForm() {

	}

	openModalControl() {
		this.show = true;
	}

	closeModalControl(event) {
		this.show = event;
	}
}
