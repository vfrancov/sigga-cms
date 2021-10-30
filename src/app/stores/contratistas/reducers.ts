import { ReloadList, ShowCardContratistas } from "@app/core/models/domains/contratistas.interface";
import { createReducer, on } from '@ngrx/store';
import { reloadList, showCard } from './actions';

export const initialState: ShowCardContratistas = {
	show: false,
	name: '',
	payload: {}
}

export const reloadState: ReloadList = {
	status: false,
	list: '',
	id: 0
}

const _showAndHideCard = createReducer(initialState, on(showCard, (state, action) => {
	return {
		show: action.show,
		name: action.name,
		payload: action.payload
	}
}))

const _reloadReducer = createReducer(reloadState, on(reloadList, (state, action) => {
	return {
		status: action.status,
		list: action.list
	}
}))

export function showAndHideCard(state, action) {
	return _showAndHideCard(state, action);
}

export function reloadReducer(state, action) {
	return _reloadReducer(state, action);
}
