import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from '@app/core/models/domains/office.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class MonitorService {

	constructor(private http: HttpClient, private storage: LocalstorageService) { }

	readEmployees(payload: Filter, endpoint: string): Observable<HttpResponse<any>> {
		return this.http.post<any>(`${environment.API}${endpoint}`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	readTotales(): Observable<HttpResponse<any>> {
		return this.http.post<any>(`${environment.API}/api/Control/AllVisitorDate`, {}, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}
}
