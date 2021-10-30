import { CardEditOffices, CardOffices, ReloadStatus } from '@app/core/models/domains/office.interface';
import { createAction, props } from '@ngrx/store';

export const showCard = createAction('[SHOW CARD OFFICE] show', props<CardOffices>());
export const showCardEdit = createAction('[SHOW CARD OFFICE] edit', props<CardEditOffices>())
export const refreshTowers = createAction('[REFRESH TOWES]', props<ReloadStatus>());
