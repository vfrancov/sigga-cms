import { Component, OnInit } from '@angular/core';
import { CardState } from '@app/stores/card/app.card.state';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexEmpleadosComponent implements OnInit {

	private employeeState: Subject<boolean> = new Subject<boolean>();

	formEmployee: boolean = false;
	showEmployeeResume: boolean = false;
	showSedes: boolean = false;
	showCompany: boolean = false;
	showDetailsEmployee: boolean = true;
	showEditForm: boolean = false;

	card: string = '';

	constructor(private store: Store<CardState>) { }

	ngOnInit() {
		this.showFormEmployee();
		this.showResumeEmployee();
		this.showSedesForm();
		this.showEditCompany();
	}

	showFormEmployee() {
		this.store.select('cardEmployee').pipe(takeUntil(this.employeeState)).subscribe((data) => {
			console.log('cardEmployee->', data);
			this.formEmployee = data.show;
			this.card = data.card;
		});
	}

	showResumeEmployee() {
		this.store.select('resumeEmployee').pipe(takeUntil(this.employeeState)).subscribe((data) => {
			console.log('resumeEmployee->', data);
			this.showEmployeeResume = data.show;
			this.card = data.card;
		});
	}

	showSedesForm() {
		this.store.select('showSedes').pipe(takeUntil(this.employeeState)).subscribe((data) => {
			console.log('showSedes->', data);
			this.showSedes = data.show;
			this.card = data.card;
		});
	}

	showEditCompany() {
		this.store.select('showCompanyEdit').pipe(takeUntil(this.employeeState)).subscribe((data) => {
			console.log('showCompanyEdit->', data);
			this.showCompany = data.show;
			this.card = data.card;
		});
	}

	showEditFormEmployee(event) {
		this.showEditForm = event;
	}

	hideEditFormEmployee(event) {
		this.showEditForm = event;
	}

	ngOnDestroy(): void {
		this.employeeState.next(true);
		this.employeeState.unsubscribe();
	}
}
