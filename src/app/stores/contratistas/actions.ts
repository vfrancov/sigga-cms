import { MemberDetails, ReloadList, ShowCardContratistas } from '@app/core/models/domains/contratistas.interface';
import { createAction, props } from '@ngrx/store';

export const showCard = createAction('[SHOW CARD] show', props<ShowCardContratistas>());
export const reloadList = createAction('[RELOAD] list', props<ReloadList>());
export const setDetailsContratista = createAction('[SET DETAILS] Contratista', props<MemberDetails>());
