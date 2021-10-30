import { Card, DetailEmployee, EditCompany, ResumeEmployee, ResumeSedes, Update } from '@app/core/models/domains/card.interface';
import { createAction, props } from '@ngrx/store';

export const showCard = createAction('[SHOW] Card', props<Card>())
export const showCardEmployee = createAction('[SHOW_CARD] Employee', props<Card>());
export const reloadList = createAction('[RELOAD EMPLOYEE] List', props<{ status: boolean, card: string }>());
export const resumeEmployee = createAction('[RESUME EMPLOYEE] Resume', props<ResumeEmployee>());
export const showSedes = createAction('[RESUME SEDES] Resume', props<ResumeSedes>());
export const showCompany = createAction('[SHOW company] Company', props<EditCompany>());
export const setDetails = createAction('[SET DETAILS] Employee', props<DetailEmployee>());
export const updateCompany = createAction('[UPDATE] Company', props<Update>());
export const updateListEmployee = createAction('[UPDATE] Employee List', props<Update>());
