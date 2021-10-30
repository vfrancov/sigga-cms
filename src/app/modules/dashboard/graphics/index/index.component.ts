import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styles: []
})
export class IndexGraphicComponent implements OnInit {

	data: any = [{
		type: "column",
		dataPoints: []
	}];

	constructor() { }

	ngOnInit() {

	}
}
