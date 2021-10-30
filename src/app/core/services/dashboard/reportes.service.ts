import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class ReportesService {

	constructor(private http: HttpClient, private storage: LocalstorageService) { }

	general(payload: any): Observable<HttpResponse<any>> {
		return this.http.post<HttpResponse<any>>(`${environment.API}/api/Report/General`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	downloadFile(fileId: any): Observable<any> {
		return this.http.get(`${environment.API}/api/Download/${fileId}`, {
			responseType: 'blob' as 'json',
			headers: {
				'accept': 'text/plain',
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	aforo(payload: any): Observable<HttpResponse<any>> {
		return this.http.post<HttpResponse<any>>(`${environment.API}/api/Report/AforoOficinas`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}

	tracking(payload: any): Observable<HttpResponse<any>> {
		return this.http.post<HttpResponse<any>>(`${environment.API}/api/Report/Tracking`, payload, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`
			}
		});
	}
}
