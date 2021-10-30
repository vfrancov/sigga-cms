export interface ChatMessage {
	id_personal_control: number,
	id_sg_residente_personal: number,
	posicion: number,
	usuario: string,
	message: string,
	fecha_envio: string,
	uid: string
}

export interface ChatData {
	id_personal_control: number,
	id_sg_residente_personal: number,
	uid: string,
	page: number,
	limit: number
}

export interface ChatResponse {
	items: Array<userMessage>,
	itemCount: number,
	totalItems: number,
	pageCount: number,
	next: string,
	previous: string
}

interface userMessage {
	fecha_envio: string
	id_personal_control: number,
	id_sg_chat: number
	id_sg_residente_personal: number
	message: string,
	posicion: number,
	usuario: string
}

export interface SendMessage {
	id_personal_control: number,
	id_sg_residente_personal: number,
	message: string,
	posicion: number,
	uid: string,
	usuario: string
}
