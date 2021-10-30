import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Companie } from '@app/core/models/domains/companie.interface';
import { CompanyService } from '@app/core/services/dashboard';
import { CardState } from '@app/stores/card/app.card.state';
import { resumeEmployee, showCompany, showSedes } from '@app/stores/card/card.actions';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-card-detalle-empresa',
	templateUrl: './card-detalle-empresa.component.html',
	styleUrls: ['./card-detalle-empresa.component.scss']
})
export class CardDetalleEmpresaComponent implements OnInit {

	@Input() offices: number = 0;
	companieDetails: Companie;

	constructor(
		private companie: CompanyService,
		private cardstore: Store<CardState>
	) { }

	ngOnInit() {
		this.setCompanieDetails();
		this.updateCompany();
	}

	setCompanieDetails() {
		this.companie.getDetailsCompany().subscribe((response: HttpResponse<Array<Companie>>) => {
			this.companieDetails = response[0];
		}, (error) => {
			console.log(error);
		});
	}

	updateCompany(){
		this.cardstore.select('upCompany').subscribe((data) => {
			if(data.status)
				this.setCompanieDetails();
		});
	}

	editarEmpresa() {
		this.cardstore.dispatch(showSedes({ show: false, card: '' }))
		this.cardstore.dispatch(resumeEmployee({ show: false, card: '' }));
		this.cardstore.dispatch(showCompany({ show: true, card: 'formEmpresa' }));
	}

	editarSede() {
		this.cardstore.dispatch(showCompany({ show: false, card: '' }));
		this.cardstore.dispatch(resumeEmployee({ show: false, card: '' }));
		this.cardstore.dispatch(showSedes({ show: true, card: 'cardSedes' }))
	}

	verMisEmpleados() {
		this.cardstore.dispatch(showSedes({ show: false, card: '' }))
		this.cardstore.dispatch(showCompany({ show: false, card: '' }));
		this.cardstore.dispatch(resumeEmployee({ show: true, card: 'resumeEmpleados' }));
	}

	seeDetailsInOut() {

	}
}
