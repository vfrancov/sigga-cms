export interface AuthResponse {
	companyId: number,
	expiration: string,
	firstName: string,
	lastName: string,
	token: string
	status: number,
	isHeaquarter: boolean,
	rolId: number,
  isResidential: boolean
}

export interface responseBody {
	list: Array<any>,
	records: string,
	pages: string,
	fileName: string
}
