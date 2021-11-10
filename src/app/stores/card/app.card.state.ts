import {
	Card,
	DetailEmployee,
	EditCompany,
	ListsReload,
	ResumeEmployee,
	ResumeSedes,
	Update
} from '@app/core/models/domains/card.interface';
import { MemberDetails } from '@app/core/models/domains/contratistas.interface';
import { CardOffices } from '@app/core/models/domains/office.interface';

export interface CardState {
	cards: Card,
	cardEmployee: Card,
	lists: ListsReload,
	resumeEmployee: ResumeEmployee
	showSedes: ResumeSedes,
	showCompanyEdit: EditCompany
	showDetailsEmployee: DetailEmployee,
	upCompany: Update,
	cardOffices: CardOffices,
  contratista: MemberDetails
}
