import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class MovileService {

	constructor(private http: HttpClient, private storage: LocalstorageService) { }

	saveMobileConfig(payload: any): Observable<HttpResponse<any>> {
		return this.http.post<any>(`${environment.API}/api/MenuItem/SaveMenuMobil`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	updateMobileConfig(payload: any, id: number): Observable<HttpResponse<any>> {
		return this.http.put<any>(`${environment.API}/api/MenuItem/UpdateMenuMobil/${id}`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}
}
