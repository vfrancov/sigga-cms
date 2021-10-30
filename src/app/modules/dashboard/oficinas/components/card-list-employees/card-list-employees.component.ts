import { Component, OnInit } from '@angular/core';
import { Filter, MemberOffice } from '@app/core/models/domains/office.interface';
import { OfficesService } from '@app/core/services/dashboard';
import { showCard } from '@app/stores/offices/actions';
import { OfficeState } from '@app/stores/offices/state';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-card-list-employees',
	templateUrl: './card-list-employees.component.html',
	styleUrls: ['./card-list-employees.component.scss']
})
export class CardListEmployeesComponent implements OnInit {

	dataEmployees: Array<MemberOffice> = [];
	defaultFilter: Filter = {
		rows: 100,
		page: 0,
		download: false
	}

	constructor(private office: OfficesService, private store: Store<OfficeState>) { }

	ngOnInit() {
		this.populateTableEmployees();
	}

	populateTableEmployees() {
		this.office.readOfficesAndEmployees(this.defaultFilter).subscribe((response) => {
			this.dataEmployees = response.body.list;
		});
	}

	closeDetalleOficinas() {
		this.store.dispatch(showCard({ show: false, name: 'details' }))
	}

}
