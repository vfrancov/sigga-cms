import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeadQuarter } from '@app/core/models/domains/headquarter.response';
import { SEDES } from '@app/core/models/enums/buttons';
import { SedesService } from '@app/core/services/dashboard';
import { CardState } from '@app/stores/card/app.card.state';
import { showSedes } from '@app/stores/card/card.actions';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-card-sedes-add',
	templateUrl: './card-sedes-add.component.html',
	styleUrls: ['./card-sedes-add.component.scss']
})
export class CardSedesAddComponent implements OnInit {

	@Input() showEditaDataSedes: boolean = false;
	showCreateSede: boolean = false;
	showEditaSede: boolean = false;
	resumeHeadQuerter: Array<HeadQuarter> = [];

	error: HttpErrorResponse;
	response: HttpResponse<Array<HeadQuarter>>;

	frmCreateSede: FormGroup;
	btnCreateSede: string = SEDES.BUTTON_CREATE;
	btnUpdateSede: string = SEDES.BUTTON_UPDATE;
	saving: boolean = false;
	selectedItem: number = 0;
	selectedToDelete: number = 0;

	constructor(
		private store: Store<CardState>,
		private sedes: SedesService,
		private formbuilder: FormBuilder) { }

	ngOnInit() {
		this.readSede();
		this.initializeFormCreate();
	}

	initializeFormCreate() {
		this.frmCreateSede = this.formbuilder.group({
			name: ['', Validators.required],
			address: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			statusId: [1, []]
		});
	}

	readSede() {
		this.sedes.getSedes().subscribe((response) => {
			if (response.status === 200)
				this.resumeHeadQuerter = response.body;
		});
	}

	addSede() {
		this.showCreateSede = true;
		this.showEditaDataSedes = false;
	}

	createSede() {
		this.btnCreateSede = SEDES.BUTTON_PROGRESS;
		this.saving = true;

		this.sedes.createSede(this.frmCreateSede.value).subscribe((response) => {
			if (response.status === 201) {
				this.readSede();
				this.showCreateSede = false;
				this.showEditaDataSedes = true;
			}

			this.frmCreateSede.reset();
			this.response = response;
			this.btnCreateSede = SEDES.BUTTON_CREATE;
			this.saving = false;
		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.btnCreateSede = SEDES.BUTTON_CREATE;
			this.saving = false;
		});
	}

	closeSede() {
		this.showCreateSede = false;
		this.showEditaDataSedes = true;
		this.showEditaSede = false;
	}

	closeSedeCard() {
		this.store.dispatch(showSedes({ show: false, card: '' }));
	}

	seeOptions(id) {
		this.selectedItem = id;
		console.log(id);
	}

	editSede(record: HeadQuarter) {
		this.showEditaDataSedes = false;
		this.showEditaSede = true;
		this.selectedItem = record.id;

		this.frmCreateSede.controls['name'].setValue(record.name);
		this.frmCreateSede.controls['address'].setValue(record.address);
		this.frmCreateSede.controls['phoneNumber'].setValue(record.phoneNumber);
		this.frmCreateSede.controls['statusId'].setValue(1);
	}

	updateSede() {
		this.btnUpdateSede = SEDES.BUTTON_PROGRESS;
		this.saving = true;

		this.sedes.updateSede(this.frmCreateSede.value, this.selectedItem).subscribe((response) => {
			this.response = response;
			this.btnUpdateSede = SEDES.BUTTON_UPDATE;
			this.saving = false;
			this.showEditaDataSedes = true;
			this.showEditaSede = false;
			this.readSede();
		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.btnUpdateSede = SEDES.BUTTON_UPDATE;
			this.saving = false;
		});
	}

	selectItem(id) {
		this.selectedToDelete = id;
	}

	deleteProcessSede(record: HeadQuarter) {
		//TODO: Cambiar esto a modelo
		this.frmCreateSede.controls['name'].setValue(record.name);
		this.frmCreateSede.controls['address'].setValue(record.address);
		this.frmCreateSede.controls['phoneNumber'].setValue(record.phoneNumber);
		this.frmCreateSede.controls['statusId'].setValue(3);

		this.sedes.updateSede(this.frmCreateSede.value, record.id).subscribe((response) => {
			this.response = response;
			this.btnUpdateSede = SEDES.BUTTON_UPDATE;
			this.saving = false;
			this.showEditaDataSedes = true;
			this.showEditaSede = false;
			this.readSede();
		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.btnUpdateSede = SEDES.BUTTON_UPDATE;
			this.saving = false;
		});
	}

	cancelProcess() {
		this.selectedToDelete = 0;
	}
}
