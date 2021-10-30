export interface Companie {
	id: number,
	name: string,
	nit: string,
	email: string,
	address: string,
	phoneNumber: string,
	statusName: string,
	typeCompanyName: string,
	typePlanName: string
}

export interface EditCompanie {
	id: number,
	name: string,
	nit: string,
	email: string,
	address: string
}
