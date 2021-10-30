import { Component, OnInit } from '@angular/core';
import { ShowCardContratistas } from '@app/core/models/domains/contratistas.interface';
import { ContratistaState } from '@app/stores/contratistas/state';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexContratistasComponent implements OnInit {

	state: ShowCardContratistas;
	modalContratistasVisits: boolean = false;
	modalContratistasIO: boolean = false;

	constructor(private store: Store<ContratistaState>) { }

	ngOnInit() {
		this.checkStore();
	}

	checkStore() {
		this.store.select('contratistas').subscribe((data) => {
			this.state = data;
		});
	}

	modalVisitContratistas(event) {
		this.modalContratistasVisits = event;
	}

	modalVisitContratistasIO(event) {
		this.modalContratistasIO = event;
	}
}
