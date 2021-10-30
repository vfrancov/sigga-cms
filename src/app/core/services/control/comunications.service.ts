import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from '@app/core/models/domains/office.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class ComunicationsService {

	constructor(private http: HttpClient, private storage: LocalstorageService) { }

	savePublication(formData: any): Observable<HttpResponse<any>> {
		return this.http.post<any>(`${environment.API}/api/Control/Publications`, formData, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	readPublications(filter: Filter): Observable<HttpResponse<any>> {
		return this.http.post(`${environment.API}/api/Control/AllPublications`, filter, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		})
	}
}
