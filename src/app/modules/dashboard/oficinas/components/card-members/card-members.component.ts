import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filter, Member } from '@app/core/models/domains/office.interface';
import { OfficesService } from '@app/core/services/dashboard';
import { showCard } from '@app/stores/offices/actions';
import { OfficeState } from '@app/stores/offices/state';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-card-members',
	templateUrl: './card-members.component.html',
	styleUrls: ['./card-members.component.scss']
})
export class CardMembersComponent implements OnInit {

	private officeState: Subject<boolean> = new Subject<boolean>();
	frmSearchMember: FormGroup;

	members: Array<Member> = [];
	defaultFilter: Filter = {
		rows: 10,
		page: 0,
		download: false
	}

	error: any;
	response: any;

	constructor(private store: Store<OfficeState>, private office: OfficesService, private formbuilder: FormBuilder) { }

	ngOnInit() {
		this.statusMembersReload();
		this.removeMembers();
		this.initializeFormMember();
	}

	initializeFormMember() {
		this.frmSearchMember = this.formbuilder.group({
			search: ['']
		});
	}

	makeSearch(event) {
		let filterValue = event.target.value;
		let memberFilter = this.members.filter((element) => element.fullName.toLocaleLowerCase().includes(filterValue));

		if(filterValue === "")
			this.statusMembersReload();
		else
			this.members = memberFilter;
	}

	statusMembersReload() {
		this.store.select('reloadList').pipe(takeUntil(this.officeState)).subscribe((data) => {
			if (data.reload && data.list === 'members')
				this.showMembersOffice(data.id);
		});
	}

	removeMembers() {
		this.store.select('cardOffice').subscribe((data) => {
			if (data.name === 'details')
				this.members = [];
		})
	}

	showMembersOffice(idOffice) {
		this.office.getMembersOffice(idOffice, this.defaultFilter).subscribe((response) => {
			this.members = response.body.list;
			this.response = response;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	showDetallesOficinas() {
		this.store.dispatch(showCard({ show: true, name: 'listEmployeesAndOffices' }))
	}

	ngOnDestroy(): void {
		this.officeState.next(true);
		this.officeState.unsubscribe();
	}
}
