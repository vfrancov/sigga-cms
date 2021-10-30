import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { statusCode } from '@app/core/constants/status.responses';
import { UiserviceService } from '@app/core/services/control';
import { CoreService } from '@app/core/services/dashboard';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

	@Input() response: HttpResponse<any>;
	@Input() error: HttpErrorResponse;
	@Input() delay: number;

	status = statusCode;
	hideError: boolean = false;

	constructor(private core: CoreService, private ui: UiserviceService) { }

	ngOnInit() {
		this.checkEvent();
	}

	checkEvent() {
		this.ui.getObservable().subscribe((result) => {
			this.hideError = !result.show;

			if(this.hideError)
				this.removeMessage();
		});
	}

	removeMessage() {
		this.core.removeMessage(this.delay).then((status) => {
			this.hideError = status;
		});
	}
}
