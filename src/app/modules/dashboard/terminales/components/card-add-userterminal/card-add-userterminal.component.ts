import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { FormTerminal, Terminal } from '@app/core/models/domains/terminales.interface';
import { TERMINALES } from '@app/core/models/enums/buttons';
import { CoreService, TerminalesService } from '@app/core/services/dashboard';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';
import { reloadList, showCard } from '@app/stores/contratistas/actions';
import { ContratistaState } from '@app/stores/contratistas/state';
import { Store } from '@ngrx/store';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-card-add-userterminal',
	templateUrl: './card-add-userterminal.component.html',
	styleUrls: ['./card-add-userterminal.component.scss']
})
export class CardAddUserterminalComponent implements OnInit {

	private terminalState: Subject<boolean> = new Subject<boolean>();

	frmTerminales: FormGroupTypeSafe<FormTerminal>;
	error: any;
	response: any;
	isEditTerminal: boolean = false;
	changePassword: boolean = false;

	btnCreateTerminal: string = TERMINALES.BUTTON_CREATE;
	btnUpdateTerminal: string = TERMINALES.BUTTON_UPDATE;
	saving: boolean = false;
	idTerminal:number = 0;

	constructor(
		@Optional() private terminales: TerminalesService,
		private frmBuilder: FormBuilderTypeSafe,
		private core: CoreService,
		private storage: LocalstorageService,
		private store: Store<ContratistaState>) { }

	ngOnInit() {
		this.initializeFormTerminal();
		this.checkState();
	}

	checkState() {
		this.store.select('contratistas').pipe(takeUntil(this.terminalState)).subscribe((data) => {
			if (this.core.isEmptyOrNull(data.payload))
				return;

			if (Object.keys(data.payload).length > 0)
			{
				this.idTerminal = data.payload.id;
				this.initializeFormEditTerminal(data.payload);
			}
		})
	}

	initializeFormTerminal() {
		this.frmTerminales = this.frmBuilder.group<FormTerminal>({
			typeControlId: new FormControl(0, Validators.required),
			officesId: new FormControl(0, Validators.required),
			userName: new FormControl('', Validators.required),
			password: new FormControl('', [Validators.required, Validators.minLength(6)]),
			confirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
			isModeQr: new FormControl(false),
      isModeScan: new FormControl(false),
			inactiveReader: new FormControl(false)
		}, { validators: this.validatePasswordEqual });
	}

	initializeFormEditTerminal(terminal: Terminal) {
		this.isEditTerminal = true;

		this.frmTerminales = this.frmBuilder.group<FormTerminal>({
			typeControlId: new FormControl(terminal.typeControlId, Validators.required),
			officesId: new FormControl(terminal.officesId, Validators.required),
			userName: new FormControl(terminal.userName),
			password: new FormControl('', [Validators.minLength(6)]),
			confirm: new FormControl('', [Validators.minLength(6)]),
			isModeQr: new FormControl(false),
      isModeScan: new FormControl(false),
			inactiveReader: new FormControl(false)
		}, { validators: this.validatePasswordEqual });
	}

	validatePasswordEqual(formControl: AbstractControl): { match: boolean } {
		return formControl.get('password').value === formControl.get('confirm').value ? null : { match: true };
	}

	createUserTerminal() {
		this.btnCreateTerminal = TERMINALES.BUTTON_CREATING;
		this.saving = true;

		this.frmTerminales.controls.isModeQr.setValue(this.core.setNumberOnBooleanValue(this.frmTerminales.controls.isModeQr.value))
		this.frmTerminales.controls.inactiveReader.setValue(this.core.setNumberOnBooleanValue(this.frmTerminales.controls.inactiveReader.value))
    this.frmTerminales.controls.isModeScan.setValue(this.core.setNumberOnBooleanValue(this.frmTerminales.controls.isModeScan.value))

		this.terminales.createTerminal(this.frmTerminales.value).subscribe((response) => {
			if (response.status === statusCode.CREATE)
				this.store.dispatch(reloadList({ status: true, list: 'terminales' }));

			this.frmTerminales.reset();
			this.closeFormTerminal();
			this.response = response;
			this.btnCreateTerminal = TERMINALES.BUTTON_CREATING;
			this.saving = false;
		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.btnCreateTerminal = TERMINALES.BUTTON_CREATING;
			this.saving = false;
		});
	}

	updateUserTerminal() {
		this.btnUpdateTerminal = TERMINALES.BUTTON_PROGRESS;
		this.saving = true;

		const request = {
			typeControlId: this.frmTerminales.controls.typeControlId.value,
			officesId: this.frmTerminales.controls.officesId.value,
			isModeQr: this.core.setNumberOnBooleanValue(this.frmTerminales.controls.isModeQr.value),
			inactiveReader: this.core.setNumberOnBooleanValue(this.frmTerminales.controls.inactiveReader.value),
      isModeScan: this.core.setNumberOnBooleanValue(this.frmTerminales.controls.isModeScan.value),
			statusId: 1
		}

		this.terminales.updateTerminal(this.idTerminal, request).subscribe((response) => {

			if(response.status === statusCode.NO_CONTENT)
				this.closeFormTerminal();

			this.btnUpdateTerminal = TERMINALES.BUTTON_UPDATE;
			this.saving =  false;
		}, (error : HttpErrorResponse) => {
			console.log(error);
			this.error = error;
			this.btnUpdateTerminal = TERMINALES.BUTTON_UPDATE;
			this.saving =  false;
		});
	}

	showChangePassword() {
		this.changePassword = true;
	}

	closeFormTerminal() {
		this.store.dispatch(showCard({ show: false, name: '', payload: {} }));
		this.storage.removeData('idTerminal');
	}

	ngOnDestroy(): void {
		this.terminalState.next(true);
		this.terminalState.unsubscribe();
	}
}
