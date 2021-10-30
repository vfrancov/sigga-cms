import { Component, Input, OnInit } from '@angular/core';
import { MonitorService } from '@app/core/services/control';

@Component({
	selector: 'app-card-totals',
	templateUrl: './card-totals.component.html',
	styleUrls: ['./card-totals.component.scss']
})
export class CardTotalsComponent implements OnInit {

	@Input() type: string;
	today: number = 0;
	yesterday: number = 0;
	month: number = 0;

	constructor(private monitoring: MonitorService) { }

	ngOnInit() {
		this.readTotal();
	}

	readTotal() {
		this.monitoring.readTotales().subscribe(response => {
			this.today = response.body.DateNow;
			this.yesterday = response.body.DateLast;
			this.month = response.body.DateMonth;
		});
	}

}
