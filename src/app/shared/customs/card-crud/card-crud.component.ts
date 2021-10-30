import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { Configuracion, CreateData } from '@app/core/models/domains/configuracion.interface';
import { Filter } from '@app/core/models/domains/office.interface';
import { ConfiguracionService } from '@app/core/services/dashboard';

@Component({
	selector: 'app-card-crud',
	templateUrl: './card-crud.component.html',
	styleUrls: ['./card-crud.component.scss']
})
export class CardCrudComponent implements OnInit {

	@Input() title: string;
	@Input() subtitle: string;
	@Input() endpoint: string;
	@Input() prefix: string;
	@Input() service: string;
	@Input() hasHeadquarter: boolean;

	elements: Array<Configuracion> = [];
	error: any;
	response: any;
	frmConfig: FormGroup;
	isSaving: boolean = false;

	defaultFilter: Filter = {
		page: 0,
		rows: 100,
		download: false
	}

	selectedItem: number = 0;
	selectedItemToDelete: number = 0;
	selectedItemToEdit: number = 0;

	editForm: boolean = false;
	createForm: boolean = true;

	constructor(
		private config: ConfiguracionService,
		private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.readElements();
		this.initializeCreateForm();
	}

	initializeCreateForm() {
		this.frmConfig = this.formBuilder.group({
			name: ['', Validators.required],
			sedesId: [''],
			statusId: [1]
		});
	}

	initializeEditForm(record: Configuracion) {
		if (this.hasHeadquarter) {
			this.frmConfig = this.formBuilder.group({
				name: [record.name, Validators.required],
				sedesId: [record.sedesId],
				statusId: [1]
			});
		}
		else {
			this.frmConfig = this.formBuilder.group({
				name: [record.name, Validators.required],
				sedesId: [0],
				statusId: [1]
			});
		}
	}

	readElements() {
		this.config.readData(this.endpoint, this.defaultFilter).subscribe((response) => {
			this.elements = response.body.list;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	readElelementsByService(service: string) {
		this.config.readData(`${service}/All`, this.defaultFilter).subscribe((response) => {
			this.elements = response.body.list;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	showOptions(record: Configuracion) {
		this.selectedItem = record.id;
	}

	showDeleteAction(record: Configuracion) {
		this.selectedItemToDelete = record.id;
	}

	showEditForm(record: Configuracion) {
		this.editForm = true;
		this.createForm = false;
		this.selectedItemToEdit = record.id;
		this.initializeEditForm(record);
	}

	showCreateForm() {
		this.editForm = true;
		this.createForm = true;
		this.selectedItem = 0;
		this.initializeCreateForm();
	}

	hideCreateForm() {
		this.editForm = false;
	}

	cancelProcess() {
		this.selectedItemToDelete = 0;
	}

	createData(service: string) {
		this.isSaving = true;

		this.config.createData(service, this.setHeadQuarter()).subscribe((response) => {
			if (response.status === statusCode.CREATE) {
				this.readElelementsByService(service);
				this.hideCreateForm();
				this.initializeCreateForm();
			}

			this.response = response;
			this.isSaving = false;
		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.isSaving = false;
		});
	}

	updateData(service) {
		this.isSaving = true;

		this.config.updateData(service, this.selectedItemToEdit, this.setHeadQuarter()).subscribe((response) => {
			if (response.status === statusCode.NO_CONTENT) {
				this.readElelementsByService(service);
				this.hideCreateForm();
				this.initializeCreateForm();
			}

			this.isSaving = false;
		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.isSaving = false;
		});
	}

	deleteData(service: string, record: Configuracion) {
		if (this.hasHeadquarter) {
			this.frmConfig.controls['name'].setValue(record.name);
			this.frmConfig.controls['sedesId'].setValue(record.sedesId);
		}
		else
			this.frmConfig.controls['name'].setValue(record.name);

		this.config.updateData(service, this.selectedItemToDelete, this.setHeadQuarter(true)).subscribe((response) => {
			if (response.status === statusCode.NO_CONTENT) {
				this.readElelementsByService(service);
				this.hideCreateForm();
				this.initializeCreateForm();
			}

		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	setHeadQuarter(isDelete: boolean = false): CreateData {
		let request: CreateData = {
			name: '',
			sedesId: 0,
			statusId: 0
		};

		if (this.hasHeadquarter) {
			request = {
				name: this.frmConfig.controls['name'].value,
				sedesId: parseInt(this.frmConfig.controls['sedesId'].value),
				statusId: this.isDeleted(isDelete)
			}
		}
		else {
			request = {
				name: this.frmConfig.controls['name'].value,
				statusId: this.isDeleted(isDelete)
			}
		}

		return request;
	}

	isDeleted(status: boolean = false): number {
		return (status) ? 3 : 1;
	}
}
