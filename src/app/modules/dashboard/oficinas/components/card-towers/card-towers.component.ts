import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-card-towers',
	templateUrl: './card-towers.component.html',
	styleUrls: ['./card-towers.component.scss']
})
export class CardTowersComponent implements OnInit {

	showForm:boolean = false;

	constructor() { }

	ngOnInit() {

	}

	showFormTowers(event) {
		this.showForm = event;
	}
}
