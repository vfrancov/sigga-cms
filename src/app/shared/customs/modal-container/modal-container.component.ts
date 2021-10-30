import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-modal-container',
	templateUrl: './modal-container.component.html',
	styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent implements OnInit {

	@Input() modalId: string;
	@Input() modalTitle: string;
	@Input() modalShow: boolean = false;
	@Output() modalHide = new EventEmitter();

	constructor() { }

	ngOnInit() {

	}

	closeModal() {
		this.modalHide.emit(false);
	}
}
