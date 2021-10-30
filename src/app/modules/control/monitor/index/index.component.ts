import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexMonitorComponent implements OnInit {

	personal: boolean = false;
	visitors: boolean = true;
	contratistas: boolean = true;
	bgModule: string = 'bg-mipersonal';

	constructor() { }

	ngOnInit() {

	}

	showMiPersonal() {
		this.personal = false;
		this.visitors = true;
		this.contratistas = true;
		this.bgModule = 'bg-mipersonal';
	}

	showMisVisitantes() {
		this.personal = true;
		this.visitors = false;
		this.contratistas = true;
		this.bgModule = 'bg-misvisitantes';
	}

	showMisContratistas() {
		this.personal = true;
		this.visitors = true;
		this.contratistas = false;
		this.bgModule = 'bg-miscontratistas';
	}
}
