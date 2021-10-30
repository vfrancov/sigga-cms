import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { statusCode } from '@app/core/constants/status.responses';
import { Tower } from '@app/core/models/domains/tower.interface';
import { TowersService } from '@app/core/services/dashboard';
import { refreshTowers, showCard } from '@app/stores/offices/actions';
import { OfficeState } from '@app/stores/offices/state';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-read',
	templateUrl: './read.component.html',
	styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

	@Output() openFormTowers = new EventEmitter();

	hideCancelTorre: boolean = true;
	enableFormTorre: boolean = false;
	selectedTower: number = 0;
	selectedTowerDelete: number = 0;

	resumeTowers: Array<Tower> = [];

	constructor(private towers: TowersService, private store: Store<OfficeState>) { }

	ngOnInit() {
		this.readTowers();
		this.reloadTowers();
	}

	reloadTowers() {
		this.store.select('reloadList').subscribe((data) => {
			if (data.reload === true && data.list === 'towers')
				this.readTowers();
		})
	}

	readTowers() {
		this.towers.getTowers().subscribe((response) => {
			this.resumeTowers = response.body;
		});
	}

	showFormTorre() {
		this.openFormTowers.emit(true);
	}

	cancelAddTorre() {

	}

	closeTorre() {
		this.store.dispatch(showCard({ show: false, name: 'details' }));
		this.store.dispatch(refreshTowers({ reload: false, list: '', id: 0 }));
	}

	detallesTorre() {

	}

	setSelectedTower(record: Tower) {
		this.selectedTower = record.id;
	}

	setSelectedTowerDelete(record: Tower) {
		this.selectedTowerDelete = record.id;
	}

	deleteTorre(record: Tower) {
		let request = {
			name: record.name,
			sedesId: record.sedeId,
			statusId: 3,
			updatedA: new Date()
		}

		this.towers.deleteTower(request, record.id).subscribe((response) => {
			if (response.status === statusCode.NO_CONTENT)
				this.readTowers();

			this.selectedTowerDelete = 0;
      this.store.dispatch(refreshTowers({ reload: true, list: 'offices', id: 0 }));
		});
	}

	cancelTorreDelete() {
		this.selectedTowerDelete = 0;
	}
}
