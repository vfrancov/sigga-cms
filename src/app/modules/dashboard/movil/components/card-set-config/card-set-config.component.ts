import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { ConfigMobile } from '@app/core/models/domains/configuracion.interface';
import { MovileService, UiserviceService } from '@app/core/services/control';
import { CoreService } from '@app/core/services/dashboard';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';

@Component({
	selector: 'app-card-set-config',
	templateUrl: './card-set-config.component.html',
	styleUrls: ['./card-set-config.component.scss']
})
export class CardSetConfigComponent implements OnInit {

	frmMobileConfig: FormGroup;
	mobileConfig: ConfigMobile;
	response: any;
	error: any;
	btnUpdateConfig: boolean = false;

	constructor(
		private ui: UiserviceService,
		private core: CoreService,
		private mobile: MovileService,
		private storage: LocalstorageService,
		private formbuilder: FormBuilder) { }

	ngOnInit() {
		this.initializeForm();
		this.setConfigForm();
	}

	initializeForm() {
		this.frmMobileConfig = this.formbuilder.group({
			covid: [false],
			autorizados: [false],
			visitantes: [false],
			publicaciones: [false],
			contratistas: [false],
			chat: [false]
		});
	}

	setConfigForm() {
		let mobileConfig: ConfigMobile = this.storage.getData('configMobile')

		if (!this.core.isEmptyOrNull(mobileConfig)) {

			this.frmMobileConfig = this.formbuilder.group({
				covid: [mobileConfig.covid],
				autorizados: [mobileConfig.autorizados],
				visitantes: [mobileConfig.visitantes],
				publicaciones: [mobileConfig.publicaciones],
				contratistas: [mobileConfig.contratistas],
				chat: [mobileConfig.chat]
			});

			this.btnUpdateConfig = true;
		}
	}

	saveMovilConfig() {
		this.mobile.saveMobileConfig({ dataMenu: JSON.stringify(this.frmMobileConfig.value) }).subscribe((response) => {
			if (response.status === statusCode.SUCCESS)
        window.location.reload();

			this.enableOption();
			this.storage.setData('configMobile', this.frmMobileConfig.value);

		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.enableOption();
			this.storage.setData('configMobile', this.frmMobileConfig.value);
		});
	}

	updateMovilConfig() {
		this.mobile.updateMobileConfig({dataMenu : JSON.stringify(this.frmMobileConfig.value)}, 1).subscribe((response) => {
			if(response.status === statusCode.NO_CONTENT)
				window.location.reload();

			this.enableOption();
			this.storage.setData('configMobile', this.frmMobileConfig.value);
		}, (error: HttpErrorResponse) => {
			this.error = error;
			this.enableOption();
			this.storage.setData('configMobile', this.frmMobileConfig.value);
		});
	}

	enableOption() {
		this.ui.setMobileConfig(this.frmMobileConfig.value);
	}
}
