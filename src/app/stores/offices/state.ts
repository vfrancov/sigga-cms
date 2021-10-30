import { CardEditOffices, CardOffices, ReloadStatus } from '@app/core/models/domains/office.interface';

export interface OfficeState {
	cardOffice: CardOffices,
	reloadList: ReloadStatus
	editOffice: CardEditOffices
}
