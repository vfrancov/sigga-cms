import { Component, OnInit } from '@angular/core';
import { ListEmployee } from '@app/core/models/domains/employee.interface';
import { SocketService } from '@app/core/services/dashboard';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexChatComponent implements OnInit {

	chatUserSelected: ListEmployee;
	showPanelChat: boolean = false;

	constructor(private socket: SocketService) { }

	ngOnInit() {

	}

	enableChat(selectedUser: ListEmployee) {
		this.chatUserSelected = selectedUser;
		this.showPanelChat = true;
	}

	disableChat(event) {
		this.showPanelChat = event;
	}
}
