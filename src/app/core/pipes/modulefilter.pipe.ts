import { Pipe, PipeTransform } from '@angular/core';
import { element } from 'protractor';
import { ModuleData } from '../models/domains/terminales.interface';

@Pipe({
	name: 'modulefilter'
})
export class ModulefilterPipe implements PipeTransform {

	transform(module: Array<ModuleData>): any {
		return module.filter(element => {
			return element.config === null
		});
	}
}
