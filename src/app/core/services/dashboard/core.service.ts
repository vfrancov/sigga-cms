import { Injectable } from '@angular/core';
import { ModuleData } from '@app/core/models/domains/terminales.interface';

@Injectable()
export class CoreService {

	constructor() { }

	setNumberOnBooleanValue(bool: number): number {
		return (bool) ? 1 : 0;
	}

	setTypeModule(moduleName: string): string {
		let name: string = '';

		switch (moduleName) {
			case 'moduleEmployees':
				name = 'Mis Empleados';
				break;
			case 'moduleVisitors':
				name = 'Mis Visitantes';
				break;
			case 'moduleContratista':
				name = 'Mis Contratistas';
				break;
		}

		return name;
	}

	convertConfigModule(moduleConfig: ModuleData) {
		let json: any = {};

		switch (moduleConfig.module) {
			case 'Mis Empleados':
				json = JSON.parse(moduleConfig.config);
				console.log(json);
				break;
			case 'Mis Visitantes':
				json = JSON.parse(moduleConfig.config);
				break;
			case 'Mis Contratistas':
				json = JSON.parse(moduleConfig.config);
				break;
		}

		return json;
	}

	isEmptyOrNull(value: any) {
		if (value === undefined || value === null || value === "")
			return true;

		return false;
	}

	removeMessage(delay: number): Promise<any> {
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => resolve(true), delay)
		})

		return promise;
	}
}
