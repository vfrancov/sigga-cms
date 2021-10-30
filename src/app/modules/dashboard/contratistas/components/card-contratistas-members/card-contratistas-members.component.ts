import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { EmpresasContratistas, MemberContratista, MemberDetails } from '@app/core/models/domains/contratistas.interface';
import { Filter } from '@app/core/models/domains/office.interface';
import { ContratistasService } from '@app/core/services/dashboard';
import { showCard } from '@app/stores/contratistas/actions';
import { ContratistaState } from '@app/stores/contratistas/state';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-card-contratistas-members',
	templateUrl: './card-contratistas-members.component.html',
	styleUrls: ['./card-contratistas-members.component.scss']
})
export class CardContratistasMembersComponent implements OnInit {

	empresa: EmpresasContratistas;
	dataMembers: Array<MemberDetails> = [];
	defaultFilter: Filter = {
		page: 0,
		rows: 10,
		download: false
	}

	error: any;
	response: any;
	selectedMember: number = 0;
	selectedMemberToDelete: number = 0;
	frmSearchMember: FormGroup;

	constructor(private store: Store<ContratistaState>, private contratista: ContratistasService, private formbuilder: FormBuilder) { }

	ngOnInit() {
		this.checkStatus();
		this.initializeFrmMembers();
	}

	initializeFrmMembers(){
		this.frmSearchMember = this.formbuilder.group({
			search : ['']
		});
	}

	makeSearch(event) {
		let filterValue = event.target.value;
		let memberFilter = this.dataMembers.filter((element) => element.fullName.toLocaleLowerCase().includes(filterValue));

		if(filterValue === "")
			this.checkStatus();
		else
			this.dataMembers = memberFilter;
	}

	checkStatus() {
		this.store.select('contratistas').subscribe((data) => {
			if (data.name === 'details') {
				this.empresa = data.payload;
				this.getMembersContratista(data.payload);
			}
			else
				this.dataMembers = [];
		});
	}

	checkReloadStatus() {
		this.store.select('reload').subscribe((data) => {
			if (data.status && data.list === 'members')
				this.getMembersContratista(this.empresa);
		});
	}

	getMembersContratista(empresa: EmpresasContratistas) {

		if (empresa.id === undefined)
			return;

		this.contratista.readMembersEmpresa(empresa.id, this.defaultFilter).subscribe((response) => {
			this.dataMembers = response.body.list;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	showOptionsContratista(record: MemberDetails) {
		this.selectedMember = record.id;
	}

	selectItemContratista(record: MemberDetails) {
		this.selectedMemberToDelete = record.id;
	}

	requestDetailsContratista(record: MemberDetails) {
		this.store.dispatch(showCard({ show: true, name: 'createcontratista', payload: record }));
	}

	deleteContratista(member: MemberDetails) {

		const request = {
			contratistaCompaniesId: member.contratistaCompaniesId,
			typeDocumentsId: 1,
			numDocument: member.numDocument,
			arlId: member.arlId,
			epsId: member.epslId,
			officesId: member.officesId,
			fullName: member.fullName,
			emailAddress: member.emailAddress,
			phoneNumber: member.phoneNumber,
			address: member.address,
			expeditionDocument: member.expeditionDocument,
			statusId: 3
		}

		this.contratista.deleteMemberContratista(member.id, request).subscribe((response) => {

			if (response.status === statusCode.NO_CONTENT)
				this.getMembersContratista(this.empresa);

			this.response = response;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	cancelDeleteContratista() {
		this.selectedMemberToDelete = 0;
	}
}
