import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-qrsite',
	templateUrl: './qrsite.component.html',
	styleUrls: ['./qrsite.component.scss']
})
export class QrsiteComponent implements OnInit {

	isActive: boolean = false;
	idParam: number = 0;

	constructor(private params: ActivatedRoute) { }

	ngOnInit() {
		this.getParam();
	}

	getParam() {
		this.params.params.subscribe((data) => this.idParam = data.id);
	}
}
