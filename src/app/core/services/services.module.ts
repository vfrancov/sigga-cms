import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { LoginService } from './auth/login.service';
import { CONTROL } from './control';
import { DASHBOARD } from './dashboard';
import { LocalstorageService } from './storage/localstorage.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	providers: [
		LoginService,
		LocalstorageService,
		ApiService,
		...DASHBOARD,
		...CONTROL
	]
})
export class ServicesModule { }
