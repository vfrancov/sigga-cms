import { Component, OnInit } from '@angular/core';
import { ConfigMobile } from '@app/core/models/domains/configuracion.interface';
import { UiserviceService } from '@app/core/services/control';
import { CoreService } from '@app/core/services/dashboard';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';

@Component({
	selector: 'app-card-config-movil',
	templateUrl: './card-config-movil.component.html',
	styleUrls: ['./card-config-movil.component.scss']
})
export class CardConfigMovilComponent implements OnInit {

	configmobile: ConfigMobile;

	constructor(
		private ui: UiserviceService,
		private storage: LocalstorageService,
		private core: CoreService) { }

	ngOnInit() {
		this.checkStorageConfig();
		this.checkData();
	}

	checkStorageConfig() {
		let configMovil = this.storage.getData('configMobile');

		if(!this.core.isEmptyOrNull(configMovil))
			this.configmobile = configMovil;
	}

	checkData() {
		this.ui.getObservable().subscribe((data) => {
			this.checkStorageConfig();
		});
	}
}
