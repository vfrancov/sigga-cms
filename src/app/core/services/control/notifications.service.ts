import { HttpClient } from '@angular/common/http';
import { not } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { commons } from '@app/core/constants/commons';
import { ListEmployee } from '@app/core/models/domains/employee.interface';
import { NotificationOneSignal } from '@app/core/models/domains/notifications.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotificationsService {

	constructor(private http: HttpClient) { }

	sendNotificationToAlls(list: Array<ListEmployee>, publicationNumber: string): Observable<any> {

		let notification: NotificationOneSignal = this.setData(publicationNumber);

		list.forEach(element => {
			if (element.numberDevice !== null)
				notification.include_player_ids.push(element.numberDevice)
		});

		return this.processRequest(notification);
	}

	sendNotificationToOne(list: Array<ListEmployee>, publicationNumber: string) {

		let notification: NotificationOneSignal = this.setData(publicationNumber);

		list.forEach(element => {
			if (element.numberDevice !== null)
				notification.include_player_ids.push(element.numberDevice);
		});

		return this.processRequest(notification);
	}

	sendNotificationChat(deviceUid: string, usuario: string, message: string, idControl: number, user: string) {

		let notificationChat: NotificationOneSignal = {
			app_id: environment.app_id,
			include_player_ids: [deviceUid],
			contents: {
				"en": `${usuario}: ${message}`,
				"es": `${usuario}: ${message}`,
				template_id: commons.TEMPLATE_CHAT
			},
			data: { id: idControl, user: user },
			template_id: commons.TEMPLATE_CHAT
		}

		return this.processRequest(notificationChat);
	}

	setData(publicationNumber: string): NotificationOneSignal {

		let notification: NotificationOneSignal = {
			app_id: environment.app_id,
			include_player_ids: [],
			contents: {
				"en": `Notificacion: Circular Informativa # ${publicationNumber}`,
				"es": `Notificacion: Circular Informativa # ${publicationNumber}`,
				template_id: commons.TEMPLATE_ID
			},
			template_id: commons.TEMPLATE_ID
		}

		return notification;
	}

	processRequest(payload: NotificationOneSignal): Observable<any> {
		return this.http.post(`${environment.API_ONE_SIGNAL}`, payload, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Basic ${environment.TOKEN_ONE_SIGNAL}`
			}
		})
	}
}
