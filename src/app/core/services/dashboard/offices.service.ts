import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter, Office, OfficeAll, OfficeAllEmployee, OfficeMembers, OfficeUpdate } from '@app/core/models/domains/office.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class OfficesService {

	constructor(private http: HttpClient, private storage: LocalstorageService) { }

	getOffices(payload: Filter): Observable<HttpResponse<OfficeAll>> {
		return this.http.post<OfficeAll>(`${environment.API}/api/Offices/All`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	createOffice(payloadOffices: Office): Observable<HttpResponse<any>> {
		return this.http.post(`${environment.API}/api/Offices`, payloadOffices, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	updateOffice(idOffice: number, payload: OfficeUpdate): Observable<HttpResponse<any>> {
		return this.http.put<HttpResponse<any>>(`${environment.API}/api/Offices/${idOffice}`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	getMembersOffice(idOffice: number, payload: Filter): Observable<HttpResponse<OfficeMembers>> {
		return this.http.post<OfficeMembers>(`${environment.API}/api/Offices/Employees/${idOffice}`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		}); 1
	}

	getOfficeById(idOffice: number): Observable<HttpResponse<any>> {
		return this.http.get(`${environment.API}/api/Offices/${idOffice}`, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	readOfficesAndEmployees(payload: Filter): Observable<HttpResponse<OfficeAllEmployee>> {
		return this.http.post<OfficeAllEmployee>(`${environment.API}/api/Offices/Employees/0`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}
}
