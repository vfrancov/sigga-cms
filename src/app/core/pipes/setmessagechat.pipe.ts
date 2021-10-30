import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'setmessagechat'
})
export class SetmessagechatPipe implements PipeTransform {

	transform(messages: Array<any>, idEmployee: number): any {
		console.log(messages);
	}
}
