import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from '@app/core/models/domains/office.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class GraphicsService {

	constructor(private http: HttpClient, private storage: LocalstorageService) { }

	entrysChart(endpoint: string, filter: Filter): Observable<HttpResponse<any>> {
		return this.http.post<any>(`${environment.API}${endpoint}`, filter, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}
}
