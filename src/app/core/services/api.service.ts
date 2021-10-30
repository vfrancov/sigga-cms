import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient) { }

	get(endpoint: string, params: any): Observable<any> {
		return this.http.get(`${environment.API}${endpoint}`, params);
	}

	post(endpoint: string, payload: any, params: any): Observable<any> {
		return this.http.post(endpoint, payload);
	}
}
