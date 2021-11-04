import { Card, DetailEmployee, EditCompany, ListsReload, ResumeEmployee, ResumeSedes, Update } from '@app/core/models/domains/card.interface';
import { createReducer, on } from '@ngrx/store';
import { reloadList, resumeEmployee, setDetails, showCard, showCardEmployee, showCompany, showSedes, updateCompany, updateListEmployee } from './card.actions';

export const initialState: Card = {
	show: false,
	card: ''
};

export const initialStateList: ListsReload = {
	status: false,
	card: ''
}

export const initialStateResume: ResumeEmployee = {
	show: false,
	card: ''
}

export const initialStateResumeSedes: ResumeSedes = {
	show: false,
	card: ''
}

export const initialStateCompany: EditCompany = {
	show: false,
	card: ''
}

export const initialStateCompanyUpdate: Update = {
	status: false
}

export const initialStateListUpdate: Update = {
	status: false
}

export const initialStateDetailEmployee: DetailEmployee = {
	show: false,
	payload: {
		id: 0,
		typeDocumentsId : 0,
		numDocument: '',
		firstName: '',
		lastName: '',
		address: '',
		phoneNumber: '',
		email: '',
		statusName: '',
		statusId: 0,
		officeName: '',
		officeId: 0,
		arlId: 0,
		epsId : 0,
		isAuthorizer: 0
	},
	card: ''
}

const _showCardReducer = createReducer(initialState,
	on(showCard, (state, action) => {
		return {
			show: action.show,
			card: action.card
		};
	})
)

const _showCardEmployeeReducer = createReducer(initialState,
	on(showCardEmployee, (state, action) => {
		return {
			show: action.show,
			card: action.card
		}
	})
)

const _reloadListReducer = createReducer(initialStateList,
	on(reloadList, (state, action) => {
		return {
			status: action.status,
			card: action.card
		}
	})
)

const _showResumeEmployeeReducer = createReducer(initialStateResume,
	on(resumeEmployee, (state, action) => {
		return {
			show: action.show,
			card: action.card
		}
	})
)

const _showResumeSedesReducer = createReducer(initialStateResumeSedes,
	on(showSedes, (state, action) => {
		return {
			show: action.show,
			card: action.card
		}
	})
)

const _showCompanyReducer = createReducer(initialStateCompany,
	on(showCompany, (state, action) => {
		return {
			show: action.show,
			card: action.card
		}
	})
)

const _setEmployeeDetailsReducer = createReducer(initialStateDetailEmployee,
	on(setDetails, (state, action) => {
		return {
			show: action.show,
			payload: action.payload,
			card: action.card
		}
	})
)

const _updateCompayReducer = createReducer(initialStateCompanyUpdate,
	on(updateCompany, (state, action) => {
		return {
			status: action.status
		}
	})
)

const _updateEmployeeListReducer = createReducer(initialStateListUpdate,
	on(updateListEmployee, (state, action) => {
		return {
			status: action.status
		}
	})
)

export function showCardReducer(state, action) {
	return _showCardReducer(state, action);
}

export function showCardEmployeeReducer(state, action) {
	return _showCardEmployeeReducer(state, action);
}

export function reloadListReducer(state, action) {
	return _reloadListReducer(state, action);
}

export function showResumeEmployeeReducer(state, action) {
	return _showResumeEmployeeReducer(state, action);
}

export function showResumeSedesReducer(state, action) {
	return _showResumeSedesReducer(state, action);
}

export function showCompanyReducer(state, action) {
	return _showCompanyReducer(state, action);
}

export function setEmployeeDetailsReducer(state, action) {
	return _setEmployeeDetailsReducer(state, action);
}

export function updateCompayReducer(state, action) {
	return _updateCompayReducer(state, action);
}
