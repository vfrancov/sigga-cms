import { Component, OnInit } from '@angular/core';
import { CardOffices } from '@app/core/models/domains/office.interface';
import { OfficeState } from '@app/stores/offices/state';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexOfficeComponent implements OnInit {

	private stateIndex: Subject<boolean> = new Subject<boolean>();

	stateData: CardOffices;
	amountOffices: number = 0;
	showModalVisitis: boolean = false;
	showModalIO: boolean = false;

	constructor(private store: Store<OfficeState>) { }

	ngOnInit() {
		this.stateDataOffice();
	}

	stateDataOffice() {
		this.store.select('cardOffice').pipe(takeUntil(this.stateIndex)).subscribe((data) => {
			this.stateData = data
		});
	}

	setAmountOffices(event) {
		this.amountOffices = event;
	}

	showModalVisits(event) {
		this.showModalVisitis = event;
	}

	showModalInOut(event) {
		this.showModalIO = event;
	}

	ngOnDestroy(): void {
		this.stateIndex.next(true);
		this.stateIndex.unsubscribe();
	}
}
