import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalstorageService {

	constructor() { }

	checkSession() {
		return (window.localStorage.getItem('us') === null) ? true : false;
	}

	getToken() {
		return JSON.parse(window.localStorage.getItem('us')).token;
	}

	getUserControl() {
		let { firstName, lastName } = JSON.parse(window.localStorage.getItem('us'));
		return `${firstName} ${lastName}`;
	}

	getIdControl(): number {
		let { id } = JSON.parse(window.localStorage.getItem('us'));
		return id;
	}

	setData(key: any, value: any) {
		return window.localStorage.setItem(key, JSON.stringify(value));
	}

	getData(key: any) {
		return JSON.parse(window.localStorage.getItem(key));
	}

	removeData(key: any) {
		return window.localStorage.removeItem(key);
	}
}
