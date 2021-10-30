import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeadQuarter, HeadQuarterEdit } from '@app/core/models/domains/headquarter.response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class SedesService {

	constructor(private http: HttpClient, private storage: LocalstorageService) { }

	getSedes(): Observable<HttpResponse<Array<HeadQuarter>>> {
		return this.http.get<Array<HeadQuarter>>(`${environment.API}/api/Sedes`, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	createSede(payloadSede: HeadQuarter): Observable<HttpResponse<any>> {
		return this.http.post(`${environment.API}/api/Sedes`, payloadSede, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	updateSede(payload: HeadQuarterEdit, id: number): Observable<HttpResponse<any>> {
		return this.http.put<HttpResponse<any>>(`${environment.API}/api/Sedes/${id}`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	getSedesByUser(): Observable<HttpResponse<any>> {
		return this.http.get(`${environment.API}/api/MenuItem/GetSedes`, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}
}
