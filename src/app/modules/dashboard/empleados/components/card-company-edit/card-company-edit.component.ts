import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { Companie, EditCompanie } from '@app/core/models/domains/companie.interface';
import { EMPRESA } from '@app/core/models/enums/buttons';
import { CompanyService } from '@app/core/services/dashboard';
import { CardState } from '@app/stores/card/app.card.state';
import { showCompany, updateCompany } from '@app/stores/card/card.actions';
import { Store } from '@ngrx/store';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';

@Component({
	selector: 'app-card-company-edit',
	templateUrl: './card-company-edit.component.html',
	styleUrls: ['./card-company-edit.component.scss']
})
export class CardCompanyEditComponent implements OnInit {

	frmEditCompany: FormGroupTypeSafe<EditCompanie>;
	dataCompanie: Companie;
	btnUpdateCompany: string = EMPRESA.BUTTON_UPDATE;
	saving: boolean = false;

	error: HttpErrorResponse;
	response: any;

	constructor(
		private store: Store<CardState>,
		private formbuilder: FormBuilderTypeSafe,
		private companie: CompanyService) { }

	ngOnInit() {
		this.getDataCompanie();
		this.initializeForm();
	}

	initializeForm() {
		this.frmEditCompany = this.formbuilder.group<EditCompanie>({
			id: new FormControl(''),
			name: new FormControl('', [Validators.required]),
			nit: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required]),
			address: new FormControl('', [Validators.required])
		});
	}

	getDataCompanie() {
		this.companie.getDetailsCompany().subscribe((response) => {
			this.dataCompanie = response[0];

			this.frmEditCompany.controls.id.setValue(this.dataCompanie.id);
			this.frmEditCompany.controls.name.setValue(this.dataCompanie.name);
			this.frmEditCompany.controls.nit.setValue(parseInt(this.dataCompanie.nit));
			this.frmEditCompany.controls.address.setValue(this.dataCompanie.address);
			this.frmEditCompany.controls.email.setValue(this.dataCompanie.email);
		});
	}

	editaempresa() {
		this.btnUpdateCompany = EMPRESA.BUTTON_PROGRESS;
		this.saving = true;

		this.companie.editDetailsCompany(this.frmEditCompany.value).subscribe((response) => {

			if (response.status === statusCode.NO_CONTENT)
				this.response = response;

			this.store.dispatch(updateCompany({ status: true }));
			this.btnUpdateCompany = EMPRESA.BUTTON_UPDATE;
			this.saving = false;

		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	closeEditEmpresa() {
		this.store.dispatch(showCompany({ show: false, card: '' }));
	}
}
