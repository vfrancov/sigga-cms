import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuUser } from '@app/core/models/domains/menu.interface';
import { UserService } from '@app/core/services/dashboard/user.service';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';
import { debug } from 'console';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	@Output() navCollapse = new EventEmitter<boolean>();

	userMenu: Array<MenuUser>
	subMenuOptions: boolean = false;
	valueEmit:boolean = false;

	constructor(
		private user: UserService,
		private router: Router,
		private storage: LocalstorageService) { }

	ngOnInit() {
		this.getMenuByUserRol();
	}

	getMenuByUserRol() {
		this.user.getMenuUser().subscribe((response: HttpResponse<Array<MenuUser>>) => this.userMenu = response.body);
	}

	showSubMenuOptions() {
		this.subMenuOptions = !this.subMenuOptions;
	}

	logout() {
		this.storage.removeData('us');
		this.router.navigate(['/']);
	}

	collapseNavbar() {
		/* let bodyApp = document.querySelector('#bodyapp');

		if (bodyApp.classList.contains('g-sidenav-show') && bodyApp.classList.contains('g-sidenav-pinned'))
		{
			bodyApp.classList.remove('g-sidenav-show');
			bodyApp.classList.remove('g-sidenav-pinned');
			bodyApp.classList.add('g-sidenav-hidden');
		}

		this.navCollapse.emit(this.valueEmit = !this.valueEmit); */
		let body = document.querySelector('#bodyapp');
		let status = false;
		let show = 'g-sidenav-show';
		let hidden = 'g-sidenav-hidden';
		let pinned = 'g-sidenav-pinned';

		if(body.classList.length > 0)
		{
			body.classList.forEach((classElement) => {
				if(classElement !== hidden)
					if(body.classList.contains(classElement))
						status = true;
			});
		}

		console.log(status);

		if(status)
		{
			body.classList.remove(pinned);
			body.classList.remove(show);
			body.classList.add(hidden);
		}
		else
		{
			body.classList.add(pinned);
			body.classList.add(show);
			body.classList.remove(hidden);
		}

		this.navCollapse.emit(this.valueEmit = !this.valueEmit);
	}
}
