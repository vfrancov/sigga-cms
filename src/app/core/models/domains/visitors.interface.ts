export interface visitorRecords {
	list: Array<Visitors>,
	records: number,
	pages: number,
	fileName: string
}

export interface Visitors {
	id: number,
	numDocument: string,
	nameEmployee: string,
	fullName: string,
	statusId: string,
	nameStatus: string,
	dateEntry: string,
	dateExit: string,
	visitorId: number
}

export interface RequestAuthorization {
	fullName: string,
	address: string,
	visitorUserId: number,
	temperature: number,
	symptoms: boolean,
	typeUser: number,
	typesActivitiesId: number,
	userEmployeesId: number,
	numDocument: string
}

export interface EmployeeEntryExit {
	nameEmployee: string,
	numDocument: string,
	statusId: string,
	nameStatus: string,
	entryAt: string,
	exitAt: string,
	nameSedes: string,
	nameArl: string,
	nameEps: string,
	temperature: string,
	symptoms: string
}

export interface VisitorsEntryExit {
	fullName: string,
	numDocument: string,
	entryAt: string,
	exitAt: string,
	nameStatus: string,
	temperature: string,
	symptoms: string,
	nameOffices: string,
	nameTowers: string,
	nameSedes: string
}

export interface ContratistaEntryExit {
	dateEntry: string,
	dateExit: string,
	fullName: string,
	nameArl: string,
	nameEps: string,
	nameStatus: string,
	numDocument: string,
	symptoms: string,
	temperature: string
}

export interface ExitVisitor {
	visitorUserId: number,
	temperature: number,
	symptoms: boolean,
	typeUser: number,
	typesActivitiesId: number,
	userEmployeesId: number,
	numDocument: string
}
