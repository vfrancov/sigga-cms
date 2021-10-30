import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfficeDetails } from '@app/core/models/domains/office.interface';
import { Tower } from '@app/core/models/domains/tower.interface';
import { TORRES, OFICINAS } from '@app/core/models/enums/buttons';
import { OfficesService, TowersService } from '@app/core/services/dashboard';
import { refreshTowers, showCard } from '@app/stores/offices/actions';
import { OfficeState } from '@app/stores/offices/state';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-card-create-office',
	templateUrl: './card-create-office.component.html',
	styleUrls: ['./card-create-office.component.scss']
})
export class CardCreateOfficeComponent implements OnInit {

	@Input() ocultaFormCreacionOficina: boolean = false;
	enableFormTorre: boolean = true;
	ocultaDetalleOficina: boolean = true;
	recordCreated: boolean = false;
	isUpdate: boolean = false;
	saving:boolean = false;

	btnCreateOffice: string = OFICINAS.BUTTON_CREATE
	btnUpdateOffice: string = OFICINAS.BUTTON_UPDATE;

	frmCreateOffice: FormGroup;
	comboBoxTorres: Array<Tower> = [];
	officeDetail: OfficeDetails;
	idOffice: number = 0;

	response: any;
	error: any;

	constructor(
		private office: OfficesService,
		private store: Store<OfficeState>,
		private tower: TowersService,
		private formbuilder: FormBuilder) { }

	ngOnInit() {
		this.getTowers();
		this.initializeOfficeForm();
		this.editOffice();
	}

	getTowers() {
		this.tower.getTowers().subscribe((response) => {
			this.comboBoxTorres = response.body;
		})
	}

	initializeOfficeForm() {
		this.frmCreateOffice = this.formbuilder.group({
			towersId: ['', [Validators.required]],
			name: ['', [Validators.required]],
			numOffices: ['', [Validators.required]],
			floor: ['', [Validators.required]],
			capacity: ['', Validators.required],
			capacityPerHours: ['', Validators.required],
			statusId: [1, [Validators.required]]
		});
	}

	editOffice() {
		this.store.select('editOffice').subscribe((data) => {
			if (data.show) {
				this.officeDetail = data.hasData;
				this.isUpdate = true;
				this.idOffice = this.officeDetail.id;
				this.frmCreateOffice.controls['towersId'].setValue(this.officeDetail.towersId);
				this.frmCreateOffice.controls['name'].setValue(this.officeDetail.name);
				this.frmCreateOffice.controls['numOffices'].setValue(this.officeDetail.numOffices);
				this.frmCreateOffice.controls['floor'].setValue(this.officeDetail.floor);
				this.frmCreateOffice.controls['capacity'].setValue(this.officeDetail.capacity);
				this.frmCreateOffice.controls['capacityPerHours'].setValue(this.officeDetail.capacityPerHours);
			}
		});
	}

	createOficina() {
		this.btnCreateOffice = OFICINAS.BUTTON_CREATING;
		this.saving = true;

		this.office.createOffice(this.frmCreateOffice.value).subscribe((response) => {
			this.response = response;
			this.store.dispatch(refreshTowers({ reload: true, list: 'offices', id: 0 }));
			this.frmCreateOffice.reset();
			this.btnCreateOffice = OFICINAS.BUTTON_CREATE;
			this.saving = false;
		}, (error: HttpErrorResponse) => {
			this.saving = false;
			this.error = error;
		});
	}

	updateOficina() {
		this.btnUpdateOffice = OFICINAS.BUTTON_PROGRESS;
		this.saving = true;

		this.office.updateOffice(this.idOffice, this.frmCreateOffice.value).subscribe((response) => {
			this.btnUpdateOffice = OFICINAS.BUTTON_UPDATE;
			this.response = response;
			this.store.dispatch(refreshTowers({ reload: true, list: 'offices', id: 0 }));
			this.saving = false;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	cancelAddTorre() {
		this.store.dispatch(showCard({ show: false, name: 'details' }));
	}

	closeAddOffice() {
		this.store.dispatch(showCard({ show: false, name: 'details' }));
	}

}
