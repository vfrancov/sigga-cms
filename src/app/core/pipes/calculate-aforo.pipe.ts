import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'calculateAforo'
})
export class CalculateAforoPipe implements PipeTransform {

	transform(capacidad: number, aforo: number): any {

		let totalValue = capacidad;

		if(totalValue === 0)
			return 0;
		else
			totalValue = aforo / capacidad * 100;

		return totalValue.toFixed();
	}
}
