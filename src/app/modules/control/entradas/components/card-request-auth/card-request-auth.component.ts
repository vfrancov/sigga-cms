import { HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { ListEmployee } from '@app/core/models/domains/employee.interface';
import { AUTHORIZATION } from '@app/core/models/enums/buttons';
import { AuthorizerService, NotificationsService } from '@app/core/services/control';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-card-request-auth',
	templateUrl: './card-request-auth.component.html',
	styleUrls: ['./card-request-auth.component.scss']
})
export class CardRequestAuthComponent implements OnInit, OnChanges {

	@Output() closeForm = new EventEmitter();
	@Input() employee: ListEmployee;
	frmRequestAuth: FormGroup;
	btnCreateAuth: string = AUTHORIZATION.BUTTON_CREATE;
	saving: boolean = false;
	devices: Array<ListEmployee> = [];

	error: any;
	response: any;

	constructor(
		private authorize: AuthorizerService,
		private notifications: NotificationsService,
		private formbuilder: FormBuilder) { }

	ngOnInit() {
		this.initializeForm();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.employee !== undefined)
			this.frmRequestAuth.controls['userEmployeesId'].setValue(this.employee.id);
	}

	initializeForm() {
		this.frmRequestAuth = this.formbuilder.group({
			fullName: [''],
			address: [''],
			visitorUserId: [0],
			temperature: [''],
			symptoms: [''],
			typeUser: ['6'],
			typesActivitiesId: [''],
			userEmployeesId: [],
			numDocument: ['']
		});
	}

	createRequestAuth() {
		this.btnCreateAuth = AUTHORIZATION.BUTTON_CREATING;
		this.saving = true;

		this.authorize.createRequestAuth(this.frmRequestAuth.value).subscribe((response) => {
			if (response.status === statusCode.SUCCESS)
				this.closeForm.emit(false);

			this.btnCreateAuth = AUTHORIZATION.BUTTON_CREATE;
			this.saving = false;
			this.frmRequestAuth.reset();
			this.sendNotification();
		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.btnCreateAuth = AUTHORIZATION.BUTTON_CREATE;
			this.saving = false;
		});
	}

	sendNotification() {
		let configNotification = {
			app_id: environment.app_id,
			include_players_id: this.devices,
			template_id: '636c093b-5b29-423c-9231-578444c1b213',
			contents: {}
		}

		configNotification.include_players_id.push(this.employee);
		configNotification.contents = {
			"en": `Solicitud de ingreso, visitante: ${this.employee.firstName} ${this.employee.lastName} identificado con CC ${this.employee.numDocument} motivo: Visita.`,
			"es": `Solicitud de ingreso, visitante: ${this.employee.firstName} identificado con CC ${this.employee.lastName} motivo: Visita.`,
			template_id: '636c093b-5b29-423c-9231-578444c1b213'
		}

		this.notifications.sendNotificationToOne(configNotification.include_players_id, '1').subscribe((response) => {
			this.devices = [];
		});
	}

	closeRequestForm() {
		this.closeForm.emit(false);
	}
}
