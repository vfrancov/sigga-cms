import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuUser } from '@app/core/models/domains/menu.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class UserService {

	constructor(private http: HttpClient, private storage: LocalstorageService) { }

	getMenuUser(): Observable<HttpResponse<Array<MenuUser>>> {
		return this.http.get<Array<MenuUser>>(`${environment.API}/api/MenuItem`, {
			observe: 'response',
			headers: {
				'Authorization': `Bearer ${this.storage.getToken()}`,
			}
		});
	}
}
