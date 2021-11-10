import { MemberDetails, ReloadList, ShowCardContratistas } from '@app/core/models/domains/contratistas.interface';

export interface ContratistaState {
	contratistas: ShowCardContratistas,
	reload: ReloadList,
  setContratista: MemberDetails
}
