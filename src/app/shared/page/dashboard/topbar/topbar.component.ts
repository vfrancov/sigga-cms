import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataEmployee } from '@app/core/models/domains/employee.interface';
import { UiserviceService } from '@app/core/services/control';
import { CoreService, SedesService } from '@app/core/services/dashboard';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';
@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

	showFloatMenu: boolean = false;
	userData: string = '';
	sedesAdmin: any[];
  authData: DataEmployee;
  sedeName: string;

	constructor(
		private storage: LocalstorageService,
		private core: CoreService,
		private sedesservice: SedesService,
		private router: Router,
		private elementRef: ElementRef) { }

	ngOnInit() {
		this.showFloatMenu = false;
		this.setProfile();
		this.sedesservice.getSedesByUser().subscribe(response => {
			this.sedesAdmin = response.body;
		});
	}

	setProfile() {
		let authData = this.storage.getData('us');
    let sedeName = this.storage.getData('sedeName');
    this.sedeName = sedeName;
		let { firstName, lastName } = authData;
    this.authData = authData;

		if (!this.core.isEmptyOrNull(authData))
			this.userData = `${firstName} ${lastName}`;
	}

	@HostListener('click', ['$event'])
	toogleMenu(event) {
		this.showFloatMenu = true;
	}

	@HostListener('document:mousedown', ['$event'])
	closeMenu(event) {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.showFloatMenu = false;
		}
	}

	setSede(idSede, name) {
		this.storage.setData('IdSede', idSede);
    this.storage.setData('sedeName', name);
		window.location.reload();
	}

	logout() {
		this.storage.removeData('us');
    this.storage.removeData('records');
    this.storage.removeData('IdSede');
		this.router.navigate(['/']);
	}
}
