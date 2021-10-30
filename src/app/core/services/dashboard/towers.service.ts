import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tower } from '@app/core/models/domains/tower.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class TowersService {

	constructor(private http: HttpClient, private storage: LocalstorageService) { }

	getTowers(): Observable<HttpResponse<Array<Tower>>> {
		return this.http.get<Array<Tower>>(`${environment.API}/api/Towers`, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	createTower(payloadOffices: Tower): Observable<HttpResponse<any>> {
		return this.http.post(`${environment.API}/api/Towers`, payloadOffices, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	deleteTower(payloadTower: any, sedeId: any): Observable<HttpResponse<any>> {
		return this.http.put(`${environment.API}/api/Towers/${sedeId}`, payloadTower, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}
}
