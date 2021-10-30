import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { statusCode } from '@app/core/constants/status.responses';
import { Publicaciones } from '@app/core/models/domains/configuracion.interface';
import { FilterAuthorizer } from '@app/core/models/domains/employee.interface';
import { Filter } from '@app/core/models/domains/office.interface';
import { AuthorizerService, ComunicationsService, NotificationsService, UiserviceService } from '@app/core/services/control';

@Component({
	selector: 'app-card-publications-registered',
	templateUrl: './card-publications-registered.component.html',
	styleUrls: ['./card-publications-registered.component.scss']
})
export class CardPublicationsRegisteredComponent implements OnInit {

	@Output() showFormPublish = new EventEmitter();
	@Input() reload: boolean = false;

	dataPublish: Array<Publicaciones> = [];
	filter: Filter = {
		page: 0,
		rows: 100,
		download: false
	}

	error: any;
	response: any;

	constructor(
		private comunicate: ComunicationsService,
		private ui: UiserviceService) { }

	ngOnInit() {
		this.readPublish();
		this.checkStatus();
	}

	checkStatus() {
		this.ui.getObservable().subscribe((data) => {
			if (!data.show)
				this.readPublish();
		});
	}

	readPublish() {
		this.comunicate.readPublications(this.filter).subscribe((response) => {
			if (response.status === statusCode.SUCCESS)
				this.dataPublish = response.body.list;

		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	enablePublish() {
		this.showFormPublish.emit(false);
	}
}
