import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filter, Office, OfficeDetails, OfficeUpdate } from '@app/core/models/domains/office.interface';
import { OfficesService } from '@app/core/services/dashboard';
import { refreshTowers, showCard, showCardEdit } from '@app/stores/offices/actions';
import { OfficeState } from '@app/stores/offices/state';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
@Component({
	selector: 'app-card-list-oficinas',
	templateUrl: './card-list-oficinas.component.html',
	styleUrls: ['./card-list-oficinas.component.scss']
})
export class CardListOficinasComponent implements OnInit {

	@Output() officesAmount: EventEmitter<number> = new EventEmitter<number>();

	officeData: Array<Office> = [];
	selectedOffice: number = 0;
	selectedOfficeId: number = 0;
	selectedOfficeDelete: number = 0;
	frmSearchOffice: FormGroup;
	loading: boolean = false;

	error: HttpErrorResponse;
	response: HttpResponse<any>;

	defaultFilter: Filter = {
		rows: 100,
		page: 0,
		download: false
	}

	private officeStore$: Subject<boolean> = new Subject<boolean>();

	constructor(private offices: OfficesService, private store: Store<OfficeState>, private formbuilder: FormBuilder) { }

	ngOnInit() {
		this.getOffices();
		this.checkOffices();
		this.initializeFormSearch();
	}

	initializeFormSearch() {
		this.frmSearchOffice = this.formbuilder.group({
			search: ['']
		});
	}

	makeFilterOffice(event) {
		let filterValue = event.target.value;
		let officeDataFilter = this.officeData.filter((element) => element.name.toLocaleLowerCase().includes(filterValue));

		if(filterValue === "")
			this.getOffices();
		else
			this.officeData = officeDataFilter;
	}

	checkOffices() {
		this.store.select('reloadList').pipe(takeUntil(this.officeStore$)).subscribe((data) => {
			if (data.list === 'offices')
				this.getOffices();
		});
	}

	getOffices() {
		this.loading = true;

		this.offices.getOffices(this.defaultFilter).subscribe((response) => {
			this.officeData = response.body.list;
			this.officesAmount.emit(this.officeData.length);
			this.loading = false;
		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.loading = false;
		});
	}

	openTorre() {
		this.store.dispatch(showCard({ show: false, name: 'office' }))
		this.store.dispatch(showCard({ show: true, name: 'towers' }))
	}

	addOffice() {
		this.store.dispatch(showCard({ show: false, name: 'towers' }))
		this.store.dispatch(showCard({ show: true, name: 'create' }))
	}

	showOptionsOffice(record: Office) {
		this.selectedOfficeId = record.id;
	}

	requestDetails(record: Office) {
		this.store.dispatch(refreshTowers({ reload: true, list: 'members', id: record.id }));
		this.store.dispatch(showCard({ show: false, name: 'details' }));
	}

	selectItem(record: Office) {
		this.selectedOfficeDelete = record.id;
	}

	deleteProcessOficina(record: OfficeDetails) {
		let request = {
			name: record.name,
			numOffices: record.numOffices,
			floor: record.floor,
			capacity: record.capacity,
			capacityPerHours: record.capacityPerHours,
			towersId: record.towersId,
			statusId: 3
		}

		this.offices.updateOffice(record.id, request).subscribe((response) => {
			this.store.dispatch(refreshTowers({ reload: true, list: 'offices', id: 0 }));
		});
	}

	cancelDelete() {
		this.selectedOfficeDelete = 0;
	}

	ngOnDestroy(): void {
		this.officeStore$.next(true);
		this.officeStore$.unsubscribe();
	}
}
