import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { MemberDetails } from '@app/core/models/domains/contratistas.interface';
import { EMPLEADOS } from '@app/core/models/enums/buttons';
import { ContratistasService } from '@app/core/services/dashboard';
import { reloadList, showCard } from '@app/stores/contratistas/actions';
import { ContratistaState } from '@app/stores/contratistas/state';
import { Store } from '@ngrx/store';
import { exit } from 'process';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-card-add-member',
	templateUrl: './card-add-member.component.html',
	styleUrls: ['./card-add-member.component.scss']
})
export class CardAddMemberComponent implements OnInit {

	frmMember: FormGroup;
	response: any;
	error: any;
	isUpdate: boolean = false;
	idMember: number = 0;
	private employeeState: Subject<boolean> = new Subject<boolean>();
	saving: boolean = false;

	constructor(
		private store: Store<ContratistaState>,
		private formbuilder: FormBuilder,
		private contratista: ContratistasService) { }

	ngOnInit() {
		this.initializeForm();
		this.checkStatusContratista();
	}

	initializeForm() {
		this.frmMember = this.formbuilder.group({
			contratistaCompaniesId: ['', Validators.required],
			typeDocumentsId: [1],
			numDocument: ['', Validators.required],
			arlId: ['', Validators.required],
			epsId: ['', Validators.required],
			officesId: ['', Validators.required],
			fullName: ['', Validators.required],
			emailAddress: ['', [Validators.required, Validators.email]],
			phoneNumber: ['', Validators.required],
			address: ['N/A'],
			expeditionDocument: ['', Validators.required]
		});

		this.isUpdate = false;
	}

	checkStatusContratista() {
		this.store.select('contratistas').pipe(takeUntil(this.employeeState)).subscribe((data) => {
			if (Object.keys(data.payload).length > 0)
				this.initializeEditForm(data.payload);
			else
				this.initializeForm();
		});
	}

	initializeEditForm(member: MemberDetails) {
		console.log('formedit->', member);
		this.frmMember = this.formbuilder.group({
			contratistaCompaniesId: [member.contratistaCompaniesId, Validators.required],
			typeDocumentsId: [1],
			numDocument: [member.numDocument, Validators.required],
			arlId: [member.arlId, Validators.required],
			epsId: [member.epslId, Validators.required],
			officesId: [member.officesId, Validators.required],
			fullName: [member.fullName, Validators.required],
			emailAddress: [member.emailAddress, [Validators.required, Validators.email]],
			phoneNumber: [member.phoneNumber, Validators.required],
			address: ['N/A'],
			expeditionDocument: [member.expeditionDocument, Validators.required],
			statusId: [1]
		});

		this.idMember = member.id;
		this.isUpdate = true;
	}

	hideFormCreateEmpresa() {
		this.store.dispatch(showCard({ show: false, name: '', payload: {} }))
	}

	createContratista() {
		this.saving = true;

		this.contratista.createMemberContratista(this.frmMember.value).subscribe((response) => {
			if (response.status === statusCode.CREATE)
				console.log('upadate list');

			this.response = response;
			this.saving = false;
		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.saving = false;
		});
	}

	updateContratista() {
		this.contratista.updateMemberContratista(this.idMember, this.frmMember.value).subscribe((response) => {
			if (response.status === statusCode.NO_CONTENT)
				this.store.dispatch(reloadList({ status: true, list: 'members' }));

			this.response = response;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	ngOnDestroy(): void {
		this.employeeState.next(true);
		this.employeeState.unsubscribe();
	}
}
