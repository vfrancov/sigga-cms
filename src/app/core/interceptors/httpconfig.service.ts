import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/storage/localstorage.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

	constructor(private localstorage: LocalstorageService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authoritazionRequest = request;
		const idSede = this.localstorage.getData('IdSede');

		if (idSede) {
			authoritazionRequest = request.clone({
				setHeaders: {
					IdSede: JSON.stringify(idSede)
				}
			});

			return next.handle(authoritazionRequest);
		}

		return next.handle(authoritazionRequest);
	}
}

export const authInterceptorProvider = [
	{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
];
