import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { statusCode } from '@app/core/constants/status.responses';
import { FilterAuthorizer, ListEmployee } from '@app/core/models/domains/employee.interface';
import { AuthorizerService, UiserviceService } from '@app/core/services/control';
import { CoreService, SocketService } from '@app/core/services/dashboard';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';

@Component({
	selector: 'app-card-users-list',
	templateUrl: './card-users-list.component.html',
	styleUrls: ['./card-users-list.component.scss']
})
export class CardUsersListComponent implements OnInit {

	@Output() userChatSelected = new EventEmitter();

	listEmployees: Array<ListEmployee> = [];
	payloadAuthorizer: FilterAuthorizer = {
		devices: true,
		page: 0,
		rows: 100,
		download: false
	}

	chatData: Array<any> = [];
	countMessage: number = 0;
	idEmployee: number = 0;

	error: any;
	response: any;
	userSelected: number = 0;

	constructor(
		private authorizers: AuthorizerService,
		private localstorage: LocalstorageService,
		private core: CoreService,
		private socket: SocketService,
		private ui: UiserviceService) { }

	ngOnInit() {
		this.getListEmployees();
		this.setEventChat();
		this.setMessageFromStorage();
	}

	setEventChat() {
		this.socket.on('chatmessagecontrol').subscribe((data) => {
			this.idEmployee = data.user.id_sg_residente_personal;

			if(this.localstorage.getIdControl() !== data.user.posicion)
				this.getMessageChat(this.idEmployee);
		});
	}

	getMessageChat(idEmployee: number) {

		if (!this.core.isEmptyOrNull(idEmployee))
			this.countMessage += 1;

		let chatUserMessage = {
			id: idEmployee,
			messages: this.countMessage
		}

		this.localstorage.setData('chat', chatUserMessage);
	}

	setMessageFromStorage() {
		let messages = this.localstorage.getData('chat');

		if(!this.core.isEmptyOrNull(messages))
		{
			this.idEmployee = messages.id;
			this.countMessage = messages.messages;
		}
	}

	getListEmployees() {
		this.authorizers.getListEmployees(this.payloadAuthorizer).subscribe((response) => {

			if (response.status === statusCode.SUCCESS)
				this.listEmployees = response.body.list;

		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	selectedUser(employee: ListEmployee) {
		this.userSelected = employee.id;
	}

	enableChat(employee: ListEmployee) {
		this.userChatSelected.emit(employee);
		this.ui.setChat(employee);
		this.localstorage.removeData('chat');
		this.idEmployee = 0;
		this.countMessage = 0;
	}
}
