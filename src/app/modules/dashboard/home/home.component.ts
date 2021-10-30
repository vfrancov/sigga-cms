import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	collapse: boolean = false;

	constructor() { }

	ngOnInit() {
		this.collapse = false;
	}

	navbarCollapse(event) {
		this.collapse = event;
	}
}
