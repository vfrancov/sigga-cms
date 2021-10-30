import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CacheService {

	constructor() { }

	setKey(key: string, value: any): void {
		window.localStorage.setItem(key, JSON.stringify(value));
	}

	removeKey(key): void {
		return window.localStorage.removeItem(key);
	}
}
