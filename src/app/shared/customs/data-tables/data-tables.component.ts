import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-data-tables',
	templateUrl: './data-tables.component.html',
	styleUrls: ['./data-tables.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DataTablesComponent implements OnInit {

	@Input() name: string;
	@Input() header: Array<any>;

	constructor() { }

	ngOnInit() {

	}
}
