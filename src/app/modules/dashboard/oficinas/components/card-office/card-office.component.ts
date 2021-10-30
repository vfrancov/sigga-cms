import { Component, OnInit } from '@angular/core';
import { AuthResponse } from '@app/core/models/domains/auth.response';
import { CardOffices, OfficeDetails } from '@app/core/models/domains/office.interface';
import { OfficesService } from '@app/core/services/dashboard';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';
import { showCard, showCardEdit } from '@app/stores/offices/actions';
import { OfficeState } from '@app/stores/offices/state';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-card-office',
	templateUrl: './card-office.component.html',
	styleUrls: ['./card-office.component.scss']
})
export class CardOfficeComponent implements OnInit {

	private officeState: Subject<boolean> = new Subject<boolean>();

	stateData: CardOffices;
	officeData: OfficeDetails;
	hideDetails: boolean = true;
  isResidential: boolean;

	constructor(private store: Store<OfficeState>, private office: OfficesService, private storage: LocalstorageService) { }

	ngOnInit() {
		this.showDetailsOffice();
		this.getIdOffice();
    this.setTypeUser();
	}

	showDetailsOffice() {
		this.store.select('cardOffice').pipe(takeUntil(this.officeState)).subscribe((data) => {
			if (!data.show) {
				this.stateData = data;
				this.hideDetails = true;
			}
			else
				this.hideDetails = false;
		});
	}

	getIdOffice() {
		this.store.select('reloadList').subscribe((data) => {
			if (data.id !== 0) {
				this.hideDetails = true;
				this.showInfoOffice(data.id);
			}
			else
				this.hideDetails = false;
		});
	}

  setTypeUser(): void {
    let user: AuthResponse = this.storage.getData('us');
    this.isResidential = user.isResidential;
  }

	showInfoOffice(idOffice) {
		this.office.getOfficeById(idOffice).subscribe((response) => {
			this.officeData = response.body;
		});
	}

	editarOficina() {
		this.store.dispatch(showCardEdit({ show: true, name: 'editoffice', hasData: this.officeData }));
		this.store.dispatch(showCard({ show: false, name: 'towers' }))
		this.store.dispatch(showCard({ show: true, name: 'create' }))
	}

	cierraDetalles() {
		this.store.dispatch(showCard({ show: true, name: 'details' }))
	}

	ngOnDestroy(): void {
		this.officeState.next(true);
		this.officeState.unsubscribe();
	}
}
