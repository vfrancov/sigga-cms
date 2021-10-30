import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatData, ChatResponse, SendMessage } from '@app/core/models/domains/chat.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ChatService {

	constructor(private http: HttpClient) { }

	readMessages(payload: ChatData): Observable<HttpResponse<ChatResponse>> {
		return this.http.post<ChatResponse>(`${environment.socketServer}/chat/getmessage`, payload, {
			observe: 'response'
		});
	}

	saveMessage(payload: SendMessage): Observable<HttpResponse<any>> {
		return this.http.post(`${environment.socketServer}/chat`, payload, {
			observe : 'response'
		});
	}
}
