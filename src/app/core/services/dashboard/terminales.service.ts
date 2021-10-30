import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from '@app/core/models/domains/office.interface';
import { FormConfigTerminal, FormTerminal, ResumeTerminales } from '@app/core/models/domains/terminales.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class TerminalesService {

	constructor(private http: HttpClient, private storage: LocalstorageService) { }

	readResumeTerminals(payload: Filter): Observable<HttpResponse<ResumeTerminales>> {
		return this.http.post<ResumeTerminales>(`${environment.API}/api/Terminal/All`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	createTerminal(dataTerminal: FormTerminal): Observable<HttpResponse<any>> {
		return this.http.post(`${environment.API}/api/Terminal`, dataTerminal, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	updateTerminal(id: number, dataTerminal: any): Observable<HttpResponse<any>> {
		return this.http.put<HttpResponse<any>>(`${environment.API}/api/Terminal/${id}`, dataTerminal, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}
}
