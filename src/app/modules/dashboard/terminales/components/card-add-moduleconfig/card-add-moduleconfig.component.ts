import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { FormConfigTerminal, FormTerminal, ModuleData, Terminal } from '@app/core/models/domains/terminales.interface';
import { TERMINALES } from '@app/core/models/enums/buttons';
import { CoreService, TerminalesService } from '@app/core/services/dashboard';
import { reloadList } from '@app/stores/contratistas/actions';
import { ContratistaState } from '@app/stores/contratistas/state';
import { Store } from '@ngrx/store';
import { debug } from 'console';
import { config, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-card-add-moduleconfig',
	templateUrl: './card-add-moduleconfig.component.html',
	styleUrls: ['./card-add-moduleconfig.component.scss']
})
export class CardAddModuleconfigComponent implements OnInit {

	private terminalStore: Subject<boolean> = new Subject<boolean>();

	@Input() terminalData: Array<ModuleData>;
	@Output() updateGridTerminal = new EventEmitter();

	terminalInfo: Array<ModuleData>;
	frmTerminalConfig: FormGroup;
	selectedModule: string = '0';

	btnCreateModule: string = TERMINALES.BUTTON_CREATE_MODULE;
	btnUpdateModule: string = TERMINALES.BUTTON_UPDATE_MODULE;
	saving: boolean = false;
	isUpdate: boolean = false;

	response: any;
	error: any;

	constructor(
		private core: CoreService,
		private terminal: TerminalesService,
		private frmbuilder: FormBuilder,
		private store: Store<ContratistaState>
	) { }

	ngOnInit() {
		this.initializeForm();
		this.terminalInfo = this.terminalData;
		this.checkStatus();
	}

	checkStatus() {
		this.store.select('contratistas').pipe(takeUntil(this.terminalStore)).subscribe((data) => {
			if (this.core.isEmptyOrNull(data.payload))
				return;

			this.selectedModule = data.payload.module;

			if (Object.keys(data.payload).length > 0)
				this.initializeFormEdit(data.payload.data);
			else
				this.initializeForm();
		});
	}

	initializeForm() {
		this.isUpdate = false;

		this.frmTerminalConfig = this.frmbuilder.group({
			photo: [false],
			temperatura: [false],
			sintomas: [false],
			datosvisitantes: [false],
			status: [false],
			modoqr: [false],
			cursos: [false],
			eps: [false],
			arl: [false],
			ruta: [false]
		});
	}

	initializeFormEdit(record: ModuleData) {

		let config = this.core.convertConfigModule(record);
		this.isUpdate = true;

		this.frmTerminalConfig = this.frmbuilder.group({
			photo: [config.photo],
			temperatura: [config.temperatura],
			sintomas: [config.sintomas],
			datosvisitantes: [config.datosvisitantes],
			status: [config.status],
			modoqr: [config.modoqr],
			cursos: [config.cursos],
			eps: [config.eps],
			arl: [config.arl],
			ruta: [config.ruta]
		});
	}

	onSelectModule(event) {
		this.selectedModule = event.target.options[event.target.options.selectedIndex].text;
	}

	createModuleTerminal() {
		this.btnCreateModule = TERMINALES.BUTTON_CREATING;
		this.saving = true;

		let request: FormConfigTerminal = {
			typeControlId: this.terminalData[0].record.typeControlId,
			officesId: this.terminalData[0].record.officesId,
			isModeQr: this.terminalData[0].record.isModeQr,
			inactiveReader: this.terminalData[0].record.inactiveReader,
			moduleEmployeess: (this.terminalInfo[0].config === null) ? null : this.terminalInfo[0].config,
			moduleContratistas: (this.terminalInfo[1].config === null) ? null : this.terminalInfo[0].config,
			moduleVisitorss: (this.terminalInfo[2].config === null) ? null : this.terminalInfo[0].config,
			statusId: 1
		}

		switch (this.selectedModule) {
			case "Mis Empleados":
				if (this.terminalInfo[0].config === null)
					request.moduleEmployeess = JSON.stringify(this.frmTerminalConfig.value);
				break;
			case "Mis Visitantes":
				if (this.terminalInfo[1].config === null)
					request.moduleVisitorss = JSON.stringify(this.frmTerminalConfig.value);
				break;
			case "Mis Contratistas":
				if (this.terminalInfo[2].config === null)
					request.moduleContratistas = JSON.stringify(this.frmTerminalConfig.value);
				break;
		}

		this.terminal.updateTerminal(this.terminalInfo[0].record.id, request).subscribe((response) => {

			if (response.status === statusCode.NO_CONTENT) {
				this.store.dispatch(reloadList({ status: true, list: 'terminales' }));
				this.updateGridTerminal.emit(true);
			}

			this.btnCreateModule = TERMINALES.BUTTON_CREATE_MODULE;
			this.saving = false;

		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.btnCreateModule = TERMINALES.BUTTON_CREATE_MODULE;
			this.saving = false;
		});
	}

	updateModuleTerminal() {
		this.btnUpdateModule = TERMINALES.BUTTON_PROGRESS;
		this.saving = true;

		const request = {
			typeControlId: this.terminalInfo[0].record.typeControlId,
			officesId: this.terminalInfo[0].record.officesId,
			isModeQr: this.core.setNumberOnBooleanValue(this.terminalInfo[0].record.isModeQr),
			inactiveReader: this.core.setNumberOnBooleanValue(this.terminalInfo[0].record.inactiveReader),
			statusId: 1,
			moduleEmployeess: this.terminalInfo[0].config,
			moduleContratistas: this.terminalInfo[1].config,
			moduleVisitorss: this.terminalInfo[2].config
		}

		switch (this.selectedModule) {
			case "Mis Empleados":
				request.moduleEmployeess = JSON.stringify(this.frmTerminalConfig.value);
				break;
			case "Mis Visitantes":
				request.moduleVisitorss = JSON.stringify(this.frmTerminalConfig.value);
				break;
			case "Mis Contratistas":
				request.moduleVisitorss = JSON.stringify(this.frmTerminalConfig.value);
				break;
		}

		this.terminal.updateTerminal(this.terminalInfo[0].record.id, request).subscribe((response) => {
			if (response.status === statusCode.NO_CONTENT) {
				this.store.dispatch(reloadList({ status: true, list: 'terminales' }));
				this.updateGridTerminal.emit(true);
			}

			this.btnUpdateModule = TERMINALES.BUTTON_PROGRESS;
			this.saving = false;
		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.btnUpdateModule = TERMINALES.BUTTON_PROGRESS;
			this.saving = false;
		});
	}
}
