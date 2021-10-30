import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Companie, EditCompanie } from '@app/core/models/domains/companie.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CacheService } from '../auth/cache.service';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class CompanyService {

	constructor(private http: HttpClient, private storage: LocalstorageService) { }

	getDetailsCompany(): Observable<HttpResponse<Array<Companie>>> {
		return this.http.get<HttpResponse<Array<Companie>>>(`${environment.API}/api/Companies`, {
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	editDetailsCompany(payload: EditCompanie): Observable<HttpResponse<any>> {
		return this.http.put<HttpResponse<any>>(`${environment.API}/api/Companies/${payload.id}`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	readAllVisits(payload: any): Observable<HttpResponse<any>> {
		return this.http.post<HttpResponse<any>>(`${environment.API}/api/Report/SummaryOfVisits`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	entrysAndExits(payload: any, endpoint: string): Observable<HttpResponse<any>> {
		return this.http.post<HttpResponse<any>>(`${environment.API}/${endpoint}`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}
}
