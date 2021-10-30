import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { ChatData, ChatResponse, SendMessage } from '@app/core/models/domains/chat.interface';
import { ListEmployee } from '@app/core/models/domains/employee.interface';
import { ChatService, NotificationsService, UiserviceService } from '@app/core/services/control';
import { SocketService } from '@app/core/services/dashboard';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';

@Component({
	selector: 'app-card-users-chat',
	templateUrl: './card-users-chat.component.html',
	styleUrls: ['./card-users-chat.component.scss']
})
export class CardUsersChatComponent implements OnInit {

	@ViewChild('chatScroll') chatScroll: ElementRef;

	@Input() chatUser: ListEmployee;
	@Input() showPanel: boolean = false;
	@Output() hidePanel = new EventEmitter();

	frmChat: FormGroup;

	initChat: boolean = false;
	messagesChat: ChatResponse;
	employee: ListEmployee;
	idControlUser: number;
	scrollTop: any;

	error: any;
	response: any;

	constructor(
		private chat: ChatService,
		private ui: UiserviceService,
		private frmbuilder: FormBuilder,
		private socket: SocketService,
		private notification: NotificationsService,
		private storage: LocalstorageService) { }

	ngOnInit() {
		this.initializeFormChat();
		this.checkState();
		this.listenEventChat();
	}

	listenEventChat() {
		this.socket.on('chatmessagecontrol').subscribe((data) => {
			this.checkState();
		});
	}

	ngAfterViewChecked(): void {
		this.setScrollBottom();
	}

	initializeFormChat() {
		this.frmChat = this.frmbuilder.group({
			message: ['', Validators.required]
		});
	}

	checkState() {
		this.ui.getObservable().subscribe((employee: ListEmployee) => {

			this.employee = employee || undefined;
			this.getIdControl();

			let chatFilter: ChatData = {
				id_personal_control: this.idControlUser,
				id_sg_residente_personal: employee.id,
				uid: this.storage.getToken(),
				page: 0,
				limit: 50
			}

			this.retriveMessagesFromChat(chatFilter);
		});
	}

	getIdControl() {
		this.idControlUser = this.storage.getIdControl();
	}

	retriveMessagesFromChat(readUserChat: ChatData) {
		this.chat.readMessages(readUserChat).subscribe((response) => {

			if (response.status === statusCode.CREATE)
				this.messagesChat = response.body;

		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	sendMessageChat() {
		let message: SendMessage = {
			id_personal_control: this.idControlUser,
			id_sg_residente_personal: this.employee.id,
			message: this.frmChat.value.message,
			posicion: this.idControlUser,
			uid: this.storage.getToken(),
			usuario: this.storage.getUserControl()
		}

		this.chat.saveMessage(message).subscribe((response) => {

			if (response.status === statusCode.CREATE)
				this.checkState();

			this.frmChat.reset();
			this.notification.sendNotificationChat(
				this.employee.numberDevice,
				message.usuario,
				message.message,
				this.idControlUser,
				message.usuario
			).subscribe((response) => {
				console.log(response);
			});

		}, (error: HttpErrorResponse) => {
			this.error = error;
		});
	}

	setScrollBottom() {
		try {
			this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight;
		} catch (error) {

		}
	}

	closePanel() {
		this.showPanel = true;
	}

	hidePanelChat() {
		this.hidePanel.emit(false);
	}

	startChat() {
		this.messagesChat.itemCount = 1;
	}
}
