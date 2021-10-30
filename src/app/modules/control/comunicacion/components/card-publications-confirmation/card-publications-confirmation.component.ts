import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { statusCode } from '@app/core/constants/status.responses';
import { Confirmation, FilterAuthorizer, FilterEmployee } from '@app/core/models/domains/employee.interface';
import { AuthorizerService } from '@app/core/services/control';
import { SocketService } from '@app/core/services/dashboard';

@Component({
	selector: 'app-card-publications-confirmation',
	templateUrl: './card-publications-confirmation.component.html',
	styleUrls: ['./card-publications-confirmation.component.scss']
})
export class CardPublicationsConfirmationComponent implements OnInit {

	confirmations: Array<Confirmation> = [];
	filter: FilterEmployee = {
		page: 0,
		rows: 20,
		download: false
	}

	error: any;
	response: any;

	constructor(private authorizer: AuthorizerService, private socket: SocketService) { }

	ngOnInit() {
		this.employeeConfirmations();
		this.eventConfirmation();
	}

	eventConfirmation(){
		this.socket.on('confirmation').subscribe((data) => {
			this.employeeConfirmations();
		});
	}

	employeeConfirmations() {
		this.authorizer.readConfirmation(this.filter).subscribe((response) => {
			if (response.status === statusCode.SUCCESS)
				this.confirmations = response.body.list;
		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}
}
