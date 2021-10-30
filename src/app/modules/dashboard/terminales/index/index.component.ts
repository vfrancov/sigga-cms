import { Component, OnInit } from '@angular/core';
import { ShowCardContratistas } from '@app/core/models/domains/contratistas.interface';
import { ContratistaState } from '@app/stores/contratistas/state';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexTerminalComponent implements OnInit {

	private terminalState: Subject<boolean> = new Subject<boolean>();
	state: ShowCardContratistas;

	constructor(private store: Store<ContratistaState>) { }

	ngOnInit() {
		this.checkStatus();
	}

	checkStatus() {
		this.store.select('contratistas').pipe(takeUntil(this.terminalState)).subscribe((data) => {
			this.state = data;
		});
	}

	ngOnDestroy(): void {
		this.terminalState.next(true);
		this.terminalState.unsubscribe();
	}

}
