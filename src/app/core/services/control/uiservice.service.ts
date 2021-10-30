import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UiserviceService {

	private subject = new BehaviorSubject({});
	ui: any = [];

	constructor() {
		this.ui = [];
	}

	getObservable(): Observable<any> {
		return this.subject.asObservable();
	}

	setData(value: any) {
		this.subject.next(value);
	}

	setEvent(data: any) {
		this.subject.next(data);
	}

	setMobileConfig(value: any) {
		this.subject.next(value);
	}

	setChat(value: any) {
		this.subject.next(value);
	}
}
