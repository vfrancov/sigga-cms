import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '@app/core/models/domains/auth.response';
import { UserAuthenticationModel } from '@app/core/models/domains/user.authentication.model';
import { HeadQuarter } from '@app/core/models/domains/headquarter.response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private http: HttpClient) { }

	siggaUserAuthentication(userData: UserAuthenticationModel): Observable<HttpResponse<AuthResponse>> {
		return this.http.post<AuthResponse>(`${environment.API}/api/SignIn`, userData, { observe: 'response' });
	}

	createHeadQuarters(quarterData, token): Observable<HttpResponse<HeadQuarter>> {
		return this.http.post<HeadQuarter>(`${environment.API}/api/Sedes`, quarterData, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
	}
}
