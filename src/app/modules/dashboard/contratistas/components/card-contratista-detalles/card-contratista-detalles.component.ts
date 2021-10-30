import { Component, OnInit } from '@angular/core';
import { EmpresasContratistas } from '@app/core/models/domains/contratistas.interface';
import { showCard } from '@app/stores/contratistas/actions';
import { ContratistaState } from '@app/stores/contratistas/state';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-card-contratista-detalles',
	templateUrl: './card-contratista-detalles.component.html',
	styleUrls: ['./card-contratista-detalles.component.scss']
})
export class CardContratistaDetallesComponent implements OnInit {

	hasData: boolean = false;
	empresaContratista: EmpresasContratistas;

	constructor(private store: Store<ContratistaState>) { }

	ngOnInit() {
		this.checkDetails();
	}

	checkDetails() {
		this.store.select('contratistas').subscribe((data) => {
			if (Object.keys(data.payload).length > 0) {
				this.empresaContratista = data.payload;
				this.hasData = true;
			}
		});
	}

	enableFormToEdit() {
		this.store.dispatch(showCard({ show: true, name: 'create', payload: this.empresaContratista }));
	}

	hideDetallesEmpresa() {
		this.store.dispatch(showCard({ show: false, name: '', payload: {} }));
		this.hasData = false;
	}
}
