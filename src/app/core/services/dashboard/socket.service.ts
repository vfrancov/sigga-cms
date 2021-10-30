import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {

	constructor(private socket: Socket) {
		//console.log(this.socket.connect(environment.socketServer));
		this.connect();
	}

	connect() {
		console.log(this.socket.ioSocket);
	}

	on(eventName: string): Observable<any> {
		return this.socket.fromEvent(eventName);
	}

	emit(eventName: string, payload: any) {
		this.socket.emit(eventName, payload);
	}
}
