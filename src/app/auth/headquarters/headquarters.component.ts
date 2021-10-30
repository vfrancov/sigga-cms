import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from '@app/core/services/auth/cache.service';
import { LoginService } from '@app/core/services/auth/login.service';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';

@Component({
	selector: 'app-headquarters',
	templateUrl: './headquarters.component.html',
	styleUrls: ['./headquarters.component.scss']
})
export class HeadquartersComponent implements OnInit {

	frmCreateHeadQuarter: FormGroup;
	btnCreateHeadQuarter: string = 'Crear sede';
	showSuccess:boolean = false;

	showErrorCreate:boolean = false;

	constructor(
		private auth: LoginService,
		private cache: CacheService,
		private route: Router,
		private storage: LocalstorageService,
		private frmBuilder: FormBuilder) { }

	ngOnInit() {
		this.checkSession();
		this.initializeForm();
	}

	checkSession(): void {
		let us = this.storage.checkSession();

		if(us)
			document.querySelector('body').removeAttribute('class');
	}

	initializeForm() {
		this.frmCreateHeadQuarter = this.frmBuilder.group({
			name: ['Principal', Validators.required],
			address: ['Calle 50', Validators.required],
			phoneNumber: ['2756514', Validators.required]
		});
	}

	createHeadQuarter() {
		this.btnCreateHeadQuarter = 'Registrando ...';

		this.auth.createHeadQuarters(this.frmCreateHeadQuarter.value, this.storage.getToken()).subscribe((response) => {
			if(response.status === 201)
			{

			}

			this.btnCreateHeadQuarter = 'Crear sede';
		}, (error) => {
			this.btnCreateHeadQuarter = 'Crear sede';
			this.showErrorCreate = true;
		});
	}

	cancelProcess(){
		this.cache.removeKey('us');
		this.route.navigate(['/']);
	}

	goToSigga(){
		this.route.navigate(['/dashboard/sigga']);
	}
}
