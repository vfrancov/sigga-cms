import { Pipe, PipeTransform } from '@angular/core';
import { commons } from '../constants/commons';

@Pipe({
	name: 'setNoDate'
})
export class SetNoDatePipe implements PipeTransform {

	transform(date: any): any {
		return (date === commons.NO_DATE) ? commons.EMPTY_DATE : '';
	}
}
