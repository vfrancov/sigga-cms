import { Component, OnInit } from '@angular/core';
import { ModuleData } from '@app/core/models/domains/terminales.interface';
import { showCard } from '@app/stores/contratistas/actions';
import { ContratistaState } from '@app/stores/contratistas/state';
import { Store } from '@ngrx/store';
import { element } from 'protractor';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-card-list-modules',
	templateUrl: './card-list-modules.component.html',
	styleUrls: ['./card-list-modules.component.scss']
})
export class CardListModulesComponent implements OnInit {

	private terminalStore: Subject<boolean> = new Subject<boolean>();
	modulesTerminal: Array<ModuleData> = [];
	modules: Array<ModuleData> = [];
	showFormConfig: boolean = false;
	showButton: boolean = false;

	constructor(private store: Store<ContratistaState>) { }

	ngOnInit() {
		this.checkState();
	}

	checkState() {
		this.store.select('contratistas').pipe(takeUntil(this.terminalStore)).subscribe((data) => {

			if (data.name !== 'modules') {
				this.showButton = false;

				if (data.name === 'createterminal')
					this.modulesTerminal = [];
			}
			else {
				this.modules = data.payload;
				this.modulesTerminal = [];
				this.showButton = true;

				this.modules.forEach(element => {
					if (element.config !== null) {
						this.showButton = true;
						this.modulesTerminal.push(element);
					}
				});
			}
		});
	}

	editModuleTerminal(record: ModuleData, moduleName: string) {
		this.showFormConfig = true;
		this.store.dispatch(showCard({ show: true, name: 'editconfig', payload: { data: record, module: moduleName } }));
	}

	showFormAsignModule() {
		this.showFormConfig = true;
		this.store.dispatch(showCard({ show: false, name: '', payload: {} }));
	}

	hideFormCreateTerminal() {
		this.showFormConfig = false;
	}

	updateTerminals(event) {
		if (event)
			this.showFormConfig = false;
	}

	ngOnDestroy(): void {
		this.terminalStore.next(true);
		this.terminalStore.unsubscribe();
	}
}
