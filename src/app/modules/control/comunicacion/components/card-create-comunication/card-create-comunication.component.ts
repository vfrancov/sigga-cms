import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { commons } from '@app/core/constants/commons';
import { statusCode } from '@app/core/constants/status.responses';
import { FilterAuthorizer, ListEmployee } from '@app/core/models/domains/employee.interface';
import { PUBLICACIONES } from '@app/core/models/enums/buttons';
import { AuthorizerService, ComunicationsService, NotificationsService, UiserviceService } from '@app/core/services/control';
import { CoreService } from '@app/core/services/dashboard';

@Component({
	selector: 'app-card-create-comunication',
	templateUrl: './card-create-comunication.component.html',
	styleUrls: ['./card-create-comunication.component.scss']
})
export class CardCreateComunicationComponent implements OnInit {

	@Output() closePublish = new EventEmitter();
	@Output() showEmployeeList = new EventEmitter();
	@Output() uncheckEmployees = new EventEmitter();
	@Input() employee: ListEmployee;

	frmPublishComunication: FormGroup;
	nameFile: string = commons.SELECT_FILE;
	fileImg: any;
	usersId: Array<any> = [];
	selectedDevices: Array<ListEmployee> = [];
	showError: boolean = false;
	typePublication: string = '';
	btnSubmitPublish: string = PUBLICACIONES.BUTTON_CREATE;
	savingPublish: boolean = false;

	payloadAuthorizer: FilterAuthorizer = {
		devices: true,
		page: 0,
		rows: 10,
		download: false
	}

	error: any;
	response: any;

	constructor(
		private frmbuilder: FormBuilder,
		private ui: UiserviceService,
		private core: CoreService,
		private authorizer: AuthorizerService,
		private notifications: NotificationsService,
		private publications: ComunicationsService) { }

	ngOnInit() {
		this.initializeForm();
		this.getEmployees();
	}

	getEmployees() {
		this.ui.getObservable().subscribe((employee: ListEmployee) => {

			if (!this.checkIfExist(employee.id)) {
				if ((typeof employee.id) === commons.IS_NUMBER) {
					this.usersId.push(employee.id);
					this.selectedDevices.push(employee);
				}
			}
			else
				this.removeElementFromArray(employee.id);
		});
	}

	checkIfExist(idEmployee: number): boolean {
		return this.usersId.includes(idEmployee);
	}

	initializeForm() {
		this.frmPublishComunication = this.frmbuilder.group({
			Name: ['', [Validators.required]],
			TypePublicationId: ['', [Validators.required]],
			NumberPublications: ['', [Validators.required]],
			NameFile: ['', [Validators.required]],
			Description: ['', [Validators.required]],
			UserIds: [[]]
		})
	}

	setFileToUpload(event: any) {
		if (event.target.files.length > 0) {
			this.nameFile = event.target.files[0].name;
			this.fileImg = event.target.files[0];
		}
	}

	savePublish() {
		if (this.typePublication !== "1" && this.usersId.length === 0) {
			this.showError = true;
			this.core.removeMessage(2500).then((status) => {
				this.showError = !status;
			})
			return;
		}

		let formSavePublish = new FormData();
		this.btnSubmitPublish = PUBLICACIONES.BUTTON_CREATING;
		this.savingPublish = true;

		formSavePublish.append('Name', this.frmPublishComunication.get('Name').value);
		formSavePublish.append('TypePublicationId', this.frmPublishComunication.get('TypePublicationId').value);
		formSavePublish.append('NumberPublications', this.frmPublishComunication.get('NumberPublications').value);
		formSavePublish.append('NameFile', this.fileImg, this.nameFile);
		formSavePublish.append('Description', this.frmPublishComunication.get('Description').value);

		if (this.usersId.length === 0)
			formSavePublish.append('UserIds[0]', '0');
		else {
			this.usersId.forEach((idEmployee, index) => {
				formSavePublish.append(`UserIds[${index}]`, JSON.stringify(idEmployee));
			});
		}

		this.publications.savePublication(formSavePublish).subscribe((response) => {
			if (response.status === statusCode.SUCCESS)
				this.response = response;

			this.btnSubmitPublish = PUBLICACIONES.BUTTON_CREATE;
			this.savingPublish = false;

			if (this.typePublication === "1")
				this.notifyToAll(this.frmPublishComunication.get('NumberPublications').value);
			else
				this.notifyToOne(this.selectedDevices, this.frmPublishComunication.get('NumberPublications').value);

			this.ui.setEvent({ show: false });
			this.frmPublishComunication.reset();
			this.closeFormPublish();

		}, (error: HttpErrorResponse) => {
			this.error = error;

			this.ui.setEvent({ show: false });

			this.btnSubmitPublish = PUBLICACIONES.BUTTON_CREATE;
			this.savingPublish = false;
		});
	}

	cancelPublish() {
		this.nameFile = commons.SELECT_FILE;
		this.frmPublishComunication.reset();
	}

	closeFormPublish() {
		this.closePublish.emit(true);
		this.nameFile = commons.SELECT_FILE;
		this.usersId = [];
	}

	setTypePublication(event: any) {
		this.showEmployeeList.emit(event);
		this.typePublication = event;
	}

	removeElementFromArray(idEmployee: number) {
		let getIndex = this.usersId.indexOf(idEmployee);

		if (getIndex > -1) {
			if (this.checkIfExist(idEmployee))
				this.usersId.splice(getIndex, 1);
		}
	}

	notifyToAll(publicationNumber: string) {
		this.authorizer.getListEmployees(this.payloadAuthorizer).subscribe((response) => {
			if (response.status === statusCode.SUCCESS)
				this.notifications.sendNotificationToAlls(response.body.list, publicationNumber).subscribe((response) => {
					console.log(response);
				});
		});
	}

	notifyToOne(collection: Array<ListEmployee>, publicationNumber: string) {
		this.notifications.sendNotificationToOne(collection, publicationNumber).subscribe((response) => {
			this.selectedDevices = [];
			this.ui.setData({ unchecked: true });
		});
	}
}
