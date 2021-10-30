import { Employee } from './employee.interface';
import { DataEmployee } from './employee.interface';

export interface Card {
	show?: boolean,
	card: string,
}

export interface ListsReload {
	status?: boolean,
	card: string
}

export interface ResumeEmployee {
	show?: boolean,
	card: string
}

export interface ResumeSedes {
	show?: boolean,
	card: string
}

export interface EditCompany {
	show?: boolean,
	card: string
}

export interface DetailEmployee {
	show?: boolean,
	payload: DataEmployee,
	card: string
}

export interface Update {
	status?: boolean
}
