export interface EmpresasContratistasAll {
	list: Array<EmpresasContratistas>,
	records: string,
	pages: string,
	fileName: any
}

export interface EmpresasContratistas {
	id: number,
	name: string,
	sedeId: number,
	sedeName: number,
	nit: string,
	email: string,
	address: string,
	phoneNumber: string,
	statusId: number,
	statusName: string
}

export interface ShowCardContratistas {
	show: boolean,
	name: string,
	payload?: any
}

export interface ReloadList {
	status: boolean,
	list: string,
	id?: number
}

export interface MemberList {
	list: Array<MemberDetails>,
	records: string,
	pages: string,
	fileName: any
}

export interface MemberContratista {
	contratistaCompaniesId: number,
	typeDocumentsId: number,
	numDocument: string,
	arlId: number,
	epsId: number,
	officesId: number,
	fullName: string,
	emailAddress: string,
	phoneNumber: string,
	address: string,
	expeditionDocument: string
}

export interface MemberDetails {
	id: number,
	fullName: string,
	contratistaCompaniesId: number,
	contratistaCompaniesName: string,
	typeDocumentsId: number,
	typeDocumentsName: string,
	numDocument: string,
	arlId: number,
	arlName: string,
	epslId: number,
	epsName: string,
	officesId: number,
	officesName: string,
	emailAddress: string,
	phoneNumber: string,
	expeditionDocument: string,
	address: string,
	statusId: number
}
