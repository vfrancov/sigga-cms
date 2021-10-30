import { AuthorizerService } from "./authorizer.service";
import { ChatService } from "./chat.service";
import { ComunicationsService } from "./comunications.service";
import { MonitorService } from "./monitor.service";
import { MovileService } from "./movile.service";
import { NotificationsService } from "./notifications.service";
import { UiserviceService } from "./uiservice.service";

export * from './authorizer.service';
export * from './monitor.service';
export * from './uiservice.service';
export * from './comunications.service';
export * from './movile.service';
export * from './notifications.service';
export * from './chat.service';

export const CONTROL = [
	AuthorizerService,
	MonitorService,
	UiserviceService,
	ComunicationsService,
	MovileService,
	NotificationsService,
	ChatService
]
