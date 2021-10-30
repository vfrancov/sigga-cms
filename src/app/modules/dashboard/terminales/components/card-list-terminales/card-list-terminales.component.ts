import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { Filter } from '@app/core/models/domains/office.interface';
import { ModuleData, Terminal } from '@app/core/models/domains/terminales.interface';
import { CoreService, TerminalesService } from '@app/core/services/dashboard';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';
import { reloadList, showCard } from '@app/stores/contratistas/actions';
import { ContratistaState } from '@app/stores/contratistas/state';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-card-list-terminales',
	templateUrl: './card-list-terminales.component.html',
	styleUrls: ['./card-list-terminales.component.scss']
})
export class CardListTerminalesComponent implements OnInit {

	private terminalSubject: Subject<boolean> = new Subject<boolean>();
	frmSearchTerminal: FormGroup;

	dataTerminales: Array<Terminal> = [];
	selectedTerminalId: number = 0;
	selectedTerminalToDelete: number = 0;
	defaultFilter: Filter = {
		rows: 100,
		page: 0,
		download: false
	}

	error: any;
	response: any;
	modulesTerminal: Array<ModuleData> = [];

	constructor(
		private terminales: TerminalesService,
		private core: CoreService,
		private storage: LocalstorageService,
		private formbuilder: FormBuilder,
		private store: Store<ContratistaState>) { }

	ngOnInit() {
		this.storage.removeData('idTerminal');
		this.readTerminales();
		this.checkStatus();
		this.initializeFormTerminal();
	}

	initializeFormTerminal(){
		this.frmSearchTerminal = this.formbuilder.group({
			search : ['']
		});
	}

	makeSearch(event) {
		let filterValue = event.target.value;
		let dataTerminalFilter = this.dataTerminales.filter((element) => element.userName.toLocaleLowerCase().includes(filterValue));

		if(filterValue === "")
			this.readTerminales();
		else
			this.dataTerminales = dataTerminalFilter;
	}

	checkStatus() {
		this.store.select('reload').pipe(takeUntil(this.terminalSubject)).subscribe((data) => {
			if (data.list === 'terminales')
				this.readTerminales();
		});
	}

	readTerminales() {
		this.terminales.readResumeTerminals(this.defaultFilter).subscribe((response) => {

			if (response.status === statusCode.SUCCESS) {
				this.dataTerminales = response.body.list;
				this.checkIdTerminalStorage();
			}

		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	checkIdTerminalStorage() {
		let idTerminal = parseInt(this.storage.getData('idTerminal'));

		if (isNaN(idTerminal))
			return this.modulesTerminal = [];
		else {
			let filterTerminalById = this.dataTerminales.filter((element) => element.id === idTerminal);
			console.log(filterTerminalById);
			this.getModulesTerminal(filterTerminalById[0]);
		}
	}

	showOptionsTerminal(userTerminal: Terminal) {
		this.selectedTerminalId = userTerminal.id;
		this.storage.setData('idTerminal', this.selectedTerminalId);
		this.getModulesTerminal(userTerminal);
	}

	getModulesTerminal(terminal: Terminal): void {

		let getModules = Object.keys(terminal);
		this.modulesTerminal = [];

		getModules.forEach(element => {
			if (element.match('module') !== null)
				this.modulesTerminal.push({
					record: terminal,
					config: terminal[element],
					module: this.core.setTypeModule(element)
				});
		});

		this.store.dispatch(showCard({ show: true, name: 'modules', payload: this.modulesTerminal }));
	}

	showFormCreateUserTerminal() {
		this.store.dispatch(showCard({ show: true, name: 'createterminal', payload: {} }));
	}

	selectRowEditTerminal(record: Terminal) {
		this.store.dispatch(showCard({ show: true, name: 'createterminal', payload: record }));
	}

	selectRowDeleteTerminal(record: Terminal) {
		this.selectedTerminalToDelete = record.id;
	}

	cancelDeleteTerminal() {
		this.selectedTerminalToDelete = 0;
	}

	deleteTerminal(record: Terminal) {
		const request = {
			typeControlId: record.typeControlId,
			officesId: record.officesId,
			isModeQr: record.isModeQr,
			inactiveReader: record.inactiveReader,
			statusId: 3,
      password: ""
		}

		this.terminales.updateTerminal(record.id, request).subscribe((response) => {
			if (response.status === statusCode.NO_CONTENT)
			{
				this.selectedTerminalToDelete = 0;
				this.store.dispatch(reloadList({ status: true, list: 'terminales' }));
			}
		});
	}

	ngOnDestroy(): void {
		this.terminalSubject.next(true);
		this.terminalSubject.unsubscribe();
	}
}
