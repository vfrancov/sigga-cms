import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Companie } from '@app/core/models/domains/companie.interface';
import { CompanyService } from '@app/core/services/dashboard';

@Component({
	selector: 'app-card-detalle-contratistas',
	templateUrl: './card-detalle-contratistas.component.html',
	styleUrls: ['./card-detalle-contratistas.component.scss']
})
export class CardDetalleContratistasComponent implements OnInit {

	@Output() visitsContratistas = new EventEmitter();
	@Output() visitsContratistasIO = new EventEmitter();
	companieDetails: Companie;

	constructor(private companie: CompanyService) { }

	ngOnInit() {
		this.setCompanieDetails();
	}

	setCompanieDetails() {
		this.companie.getDetailsCompany().subscribe((response: HttpResponse<Array<Companie>>) => {
			this.companieDetails = response[0];
		}, (error) => {
			console.log(error);
		});
	}

	showVisitsContratistas() {
		this.visitsContratistas.emit(true);
	}

	showVisitsContratistasIO() {
		this.visitsContratistasIO.emit(true);
	}
}
