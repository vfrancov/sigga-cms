export interface FilterResponse {
	list: Array<any>,
	records: string,
	pages: string,
	fileName: string
}

export interface Configuracion {
	id: number,
	name: string,
	sedesId?: number,
	statusId: number,
	statusName: string
}

export interface CreateData {
	name: string,
	sedesId?: number,
	statusId?: number
}

export interface ConfigMobile {
	autorizados: boolean,
	chat: boolean,
	contratistas: boolean,
	covid: true
	publicaciones: boolean,
	visitantes: boolean
}

export interface Publicaciones {
	typePublicationName: string,
	name: string,
	number: string,
	description: string,
	urlFile: string,
	datePublication: string
}
