import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { FormEmployee } from '@app/core/models/domains/employee.interface';
import { EMPLEADOS } from '@app/core/models/enums/buttons';
import { EmployeesService } from '@app/core/services/dashboard';
import { CardState } from '@app/stores/card/app.card.state';
import { reloadList, showCardEmployee } from '@app/stores/card/card.actions';
import { Store } from '@ngrx/store';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';

@Component({
	selector: 'app-card-add-empleado',
	templateUrl: './card-add-empleado.component.html',
	styleUrls: ['./card-add-empleado.component.scss']
})
export class CardAddEmpleadoComponent implements OnInit {

	frmCreateEmployee: FormGroupTypeSafe<FormEmployee>;
	isAuthorizer: boolean = false;
	response: any;
	saving: boolean = true;

	btnCreateEmployee: string = EMPLEADOS.BUTTON_CREATE;

	constructor(
		private store: Store<CardState>,
		private formBuilder: FormBuilderTypeSafe,
		private employee: EmployeesService
	) { }

	ngOnInit() {
		this.initializeForm();
	}

	initializeForm() {
		this.frmCreateEmployee = this.formBuilder.group<FormEmployee>({
			typeDocumentsId: new FormControl(0, [Validators.required]),
			numDocument: new FormControl('', [Validators.required]),
			fname: new FormControl('', [Validators.required]),
			lname: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			address: new FormControl('', [Validators.required]),
			phoneNumber: new FormControl('', [Validators.required]),
			officesId: new FormControl(0, [Validators.required]),
			arlId: new FormControl(0, [Validators.required]),
			epsId: new FormControl(0, [Validators.required]),
			isAuthorizer: new FormControl(0, [Validators.required]),
			StatusId: new FormControl(0, [])
		});
	}

	createEmpleado() {
		this.btnCreateEmployee = EMPLEADOS.BUTTON_PROGRESS;
		this.saving = true;
		this.setIsAuthorizer();

		this.employee.createEmployee(this.frmCreateEmployee.value).subscribe((response) => {
			if (response.status === statusCode.CREATE)
				this.reloadListEmployee();

			this.response = response;
			this.initializeForm();
			this.btnCreateEmployee = EMPLEADOS.BUTTON_CREATE;
			this.saving = false;
		}, (error: HttpErrorResponse) => {
			this.response = error;
			this.btnCreateEmployee = EMPLEADOS.BUTTON_CREATE;
			this.saving = false;
		});
	}

	setIsAuthorizer() {
		if (this.isAuthorizer)
			this.frmCreateEmployee.controls.isAuthorizer.setValue(1);
		else
			this.frmCreateEmployee.controls.isAuthorizer.setValue(0);
	}

	reloadListEmployee() {
		this.store.dispatch(reloadList({ status: true, card: '' }))
	}

	closeFormEmployee() {
		this.store.dispatch(showCardEmployee({ show: false, card: '' }));
	}

	enableAuthorizer() {
		console.log('here');
	}
}
