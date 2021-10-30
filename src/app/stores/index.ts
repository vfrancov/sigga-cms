import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './card/card.reducer';
import * as contratistas from './contratistas/reducers';
import * as office from './offices/reducers';

export const rootReducers: ActionReducerMap<any> = {
	cards: reducers.showCardReducer,
	cardEmployee: reducers.showCardEmployeeReducer,
	lists: reducers.reloadListReducer,
	resumeEmployee: reducers.showResumeEmployeeReducer,
	showSedes: reducers.showResumeSedesReducer,
	showCompanyEdit: reducers.showCompanyReducer,
	showDetailsEmployee: reducers.setEmployeeDetailsReducer,
	upCompany: reducers.updateCompayReducer,
	cardOffice: office.showAndHideCard,
	reloadList: office.reloadList,
	editOffice: office.showAndHideCardEdit,
	contratistas: contratistas.showAndHideCard,
	reload: contratistas.reloadReducer
}
