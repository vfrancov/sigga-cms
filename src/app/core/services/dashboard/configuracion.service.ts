import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateData, FilterResponse } from '@app/core/models/domains/configuracion.interface';
import { Filter } from '@app/core/models/domains/office.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class ConfiguracionService {

	constructor(
		private http: HttpClient,
		private storage: LocalstorageService) { }

	readData(endpoint: string, payload: Filter): Observable<HttpResponse<FilterResponse>> {
		return this.http.post<FilterResponse>(`${environment.API}${endpoint}`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	createData(endpoint: string, payload: CreateData): Observable<HttpResponse<any>> {
		return this.http.post<HttpResponse<any>>(`${environment.API}${endpoint}`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	updateData(endpoint: string, id: number, payload: CreateData): Observable<HttpResponse<any>> {
		return this.http.put<HttpResponse<any>>(`${environment.API}${endpoint}/${id}`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}
}
