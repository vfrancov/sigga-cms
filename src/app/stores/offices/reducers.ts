import { CardEditOffices, CardOffices, ReloadStatus } from '@app/core/models/domains/office.interface';
import { createReducer, on } from '@ngrx/store';
import { refreshTowers, showCard, showCardEdit } from './actions';

export const initialStateCardOffice: CardOffices = {
	show: false,
	name: 'details'
}

export const initialStateReloadStatus: ReloadStatus = {
	reload: false,
	list: '',
	id: 0
}

export const initialStateCardEditOffice: CardEditOffices = {
	show: false,
	name: '',
	hasData: {}
}

const _showAndHideCard = createReducer(initialStateCardOffice,
	on(showCard, (state, action) => {
		return {
			show: action.show,
			name: action.name
		}
	})
)

const _reloadList = createReducer(initialStateReloadStatus,
	on(refreshTowers, (state, action) => {
		return {
			reload: action.reload,
			list: action.list,
			id: action.id
		}
	})
)

const _showAndHideCardEdit = createReducer(initialStateCardEditOffice,
	on(showCardEdit, (state, action) => {
		return {
			show: action.show,
			name: action.name,
			hasData: action.hasData
		}
	})
)

export function showAndHideCard(state, action) {
	return _showAndHideCard(state, action);
}

export function reloadList(state, action) {
	return _reloadList(state, action);
}

export function showAndHideCardEdit(state, action) {
	return _showAndHideCardEdit(state, action);
}
