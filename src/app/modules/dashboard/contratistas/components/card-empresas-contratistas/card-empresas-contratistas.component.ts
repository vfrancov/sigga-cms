import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { EmpresasContratistas } from '@app/core/models/domains/contratistas.interface';
import { Filter } from '@app/core/models/domains/office.interface';
import { ContratistasService } from '@app/core/services/dashboard';
import { reloadList, showCard } from '@app/stores/contratistas/actions';
import { ContratistaState } from '@app/stores/contratistas/state';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-card-empresas-contratistas',
	templateUrl: './card-empresas-contratistas.component.html',
	styleUrls: ['./card-empresas-contratistas.component.scss']
})
export class CardEmpresasContratistasComponent implements OnInit {

	dataContratistas: Array<EmpresasContratistas> = [];
	selectedContratistaId: number = 0;
	selectedContratistaDel: number = 0;
	frmSearchContratista: FormGroup;
	loading: boolean = false;

	defaultFilter: Filter = {
		page: 0,
		rows: 10,
		download: false
	}

	error: any;
	response: any;

	constructor(
		private contratistas: ContratistasService,
		private formbuilder: FormBuilder,
		private store: Store<ContratistaState>) { }

	ngOnInit() {
		this.getCompaniesAll();
		this.checkStateContratistas();
		this.initializeFormContratista();
	}

	initializeFormContratista() {
		this.frmSearchContratista = this.formbuilder.group({
			search: ['']
		})
	}

	makeFilterContratista(event) {
		let filterValue = event.target.value;
		let dataContratistasFilter = this.dataContratistas.filter((element) => element.name.toLocaleLowerCase().includes(filterValue));

		if(filterValue === "")
			this.getCompaniesAll();
		else
			this.dataContratistas = dataContratistasFilter;
	}

	checkStateContratistas() {
		this.store.select('reload').subscribe((data) => {
			if (data.status && data.list === 'empresas')
				this.getCompaniesAll();
		});
	}

	getCompaniesAll() {
		this.loading = true;

		this.contratistas.getEmpresasContratistas(this.defaultFilter).subscribe((response) => {
			this.dataContratistas = response.body.list;
			this.response = response;
			this.loading = false;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	showFormEmpresa() {
		this.store.dispatch(showCard({ show: true, name: 'create', payload: {} }));
	}

	showFormContratistas() {
		this.store.dispatch(showCard({ show: true, name: 'createcontratista', payload: {} }));
	}

	showOptionsContratista(row: EmpresasContratistas) {
		this.selectedContratistaId = row.id;
	}

	selectItem(row: EmpresasContratistas) {
		this.selectedContratistaDel = row.id;
	}

	requestDetails(record: EmpresasContratistas) {
		this.store.dispatch(showCard({ show: true, name: 'details', payload: record }));
	}

	deleteEmpresa(record: EmpresasContratistas) {

		const request = {
			name: record.name,
			nit: record.nit,
			email: record.email,
			address: record.email,
			sedesId: record.sedeId,
			statusId: 3
		}

		this.contratistas.deleteEmpresaContratista(record.id, request).subscribe((response) => {
			if (response.status === statusCode.NO_CONTENT)
				this.store.dispatch(reloadList({ status: true, list: 'empresas' }));

			this.response = response;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	cancelDelete() {
		this.selectedContratistaDel = 0;
	}
}
