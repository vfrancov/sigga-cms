export interface ResumeTerminales {
	list: Array<Terminal>,
	records: string,
	pages: string,
	fileName: string
}

export interface Terminal {
	id: number,
	statusId: number,
	statusName: string,
	typeControlId: number,
	typeControlName: string,
	officesId: number,
	officeName: string,
	userName: string,
	isModeQr: number,
	inactiveReader: number,
	moduleEmployees: string,
	moduleVisitors: string,
	moduleContratista: string,
  isModeScan: number
}

export interface FormTerminal {
	typeControlId: number,
	officesId: number,
	userName: string,
	password: string,
	confirm: string,
	isModeQr: number,
  isModeScan?: number,
	inactiveReader: number
	moduleEmployees?: string,
	moduleVisitors?: string,
	moduleContratista?: string
}

export interface FormConfigTerminal {
	typeControlId: number,
	officesId: number,
	isModeQr: number,
	inactiveReader: number,
	statusId: number,
	moduleEmployeess: string,
	moduleVisitorss: string,
	moduleContratistas: string
}

export interface ModuleData {
	config: string,
	module: string,
	record: Terminal
}
