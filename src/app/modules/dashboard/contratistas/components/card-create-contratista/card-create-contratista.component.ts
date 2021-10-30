import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { EmpresasContratistas } from '@app/core/models/domains/contratistas.interface';
import { ContratistasService } from '@app/core/services/dashboard';
import { reloadList, showCard } from '@app/stores/contratistas/actions';
import { ContratistaState } from '@app/stores/contratistas/state';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-card-create-contratista',
	templateUrl: './card-create-contratista.component.html',
	styleUrls: ['./card-create-contratista.component.scss']
})
export class CardCreateContratistaComponent implements OnInit {

	frmContratistas: FormGroup;
	error: any;
	response: any;
	empresaId: number = 0;
	isUpdate: boolean = false;

	constructor(
		private store: Store<ContratistaState>,
		private contratista: ContratistasService,
		private formbuilder: FormBuilder) { }

	ngOnInit() {
		this.initializeForm();
		this.checkStateContratista();
	}

	checkStateContratista() {
		this.store.select('contratistas').subscribe((data) => {
			if(Object.keys(data.payload).length > 0)
				this.initializeEditForm(data.payload);
			else
			{
				this.initializeForm();
				this.isUpdate = false;
			}
		});
	}

	initializeForm() {
		this.frmContratistas = this.formbuilder.group({
			sedesId: ['', Validators.required],
			name: ['', Validators.required],
			nit: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			address: ['', Validators.required],
			phoneNumber: ['', Validators.required]
		});
	}

	initializeEditForm(data: EmpresasContratistas) {

		this.frmContratistas = this.formbuilder.group({
			sedesId: [data.sedeId, Validators.required],
			name: [data.name, Validators.required],
			nit: [data.nit, Validators.required],
			email: [data.email, [Validators.required, Validators.email]],
			address: [data.address, Validators.required],
			phoneNumber: [data.phoneNumber, Validators.required],
			statusId: [1]
		});

		this.empresaId = data.id;
		this.isUpdate = true;
	}

	hideFormCreateEmpresa() {
		this.store.dispatch(showCard({ show: false, name: '', payload: {} }));
	}

	createEmpresaContratista() {
		this.contratista.createEmpresaContratista(this.frmContratistas.value).subscribe((response) => {
			if (response.status === statusCode.CREATE)
				this.store.dispatch(reloadList({ status: true, list: 'empresas' }));

			this.response = response;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	updateEmpresaContratista() {
		this.contratista.updateEmpresaContratista(this.empresaId, this.frmContratistas.value).subscribe((response) => {
			if (response.status === statusCode.NO_CONTENT)
				this.store.dispatch(reloadList({ status: true, list: 'empresas' }));

			this.response = response;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		})
	}
}
