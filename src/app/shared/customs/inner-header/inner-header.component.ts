import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-inner-header',
	templateUrl: './inner-header.component.html',
	styleUrls: ['./inner-header.component.scss']
})
export class InnerHeaderComponent implements OnInit {

	@Input() modulo: string;
	@Input() background: string;

	constructor() { }

	ngOnInit() {

	}

}
