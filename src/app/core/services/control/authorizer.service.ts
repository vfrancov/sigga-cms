import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { responseBody } from '@app/core/models/domains/auth.response';
import { Authorizer, FilterAuthorizer, FilterEmployee } from '@app/core/models/domains/employee.interface';
import { Filter } from '@app/core/models/domains/office.interface';
import { RequestAuthorization, visitorRecords } from '@app/core/models/domains/visitors.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class AuthorizerService {

	constructor(private http: HttpClient, private storage: LocalstorageService) { }

	getListEmployees(payload: FilterAuthorizer): Observable<HttpResponse<Authorizer>> {
		return this.http.post<Authorizer>(`${environment.API}/api/employee/all`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	getListVisitors(payload: Filter): Observable<HttpResponse<visitorRecords>> {
		return this.http.post<visitorRecords>(`${environment.API}/api/Control/AllAuthorizations`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	createRequestAuth(payload: RequestAuthorization): Observable<HttpResponse<any>> {
		return this.http.post<HttpResponse<any>>(`${environment.API}/api/Control/RegisterVisitorControl`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	giveOut(idVisitor: any): Observable<HttpResponse<any>> {
		return this.http.post<any>(`${environment.API}/api/Control/ExitVisitor/${idVisitor}`, {}, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	readConfirmation(filter: FilterEmployee): Observable<HttpResponse<responseBody>> {
		return this.http.post<responseBody>(`${environment.API}/api/Control/AllReadPublications`, filter, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}
}
