export interface Employee {
  list: Array<DataEmployee>,
  fileName: string,
  pages: string,
  records: string
}

export interface Authorizer {
  list: Array<ListEmployee>,
  fileName: string,
  pages: string,
  records: string
}

export interface DataEmployee {
  id: number,
  typeDocumentsId: number,
  numDocument: string,
  firstName: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  email: string,
  statusName: string,
  statusId: number,
  officeName: string,
  officeId: number,
  arlId: number,
  epsId: number,
  isAuthorizer: number
  isUserControl?: number,
  rolId?: number
}

export interface ListEmployee {
  address: string,
  arlId: number,
  arlName: string,
  email: string,
  epsName: string,
  epsId: number,
  firstName: string,
  id: number,
  isAuthorizer: number,
  lastName: string,
  numDocument: string,
  numberDevice: string,
  officeId: number,
  officeName: string,
  phoneNumber: string,
  statusId: number,
  statusName: string,
  typeDocumentsId: number,
  typeDocumentsName: string
}

export interface EditEmployee {
  typeDocumentsId: number,
  numDocument: string,
  fname: string,
  lname: string,
  email: string,
  address: string,
  phoneNumber: string,
  officesId: number,
  arlId: number,
  epsId: number,
  isAuthorizer: number,
  StatusId: number,
  isResidential?: number,
  isFloating?: number
}

export interface FormEmployee {
  typeDocumentsId: number,
  numDocument: string,
  fname: string,
  lname: string,
  email: string,
  address: string,
  phoneNumber: number,
  officesId: number,
  arlId: number,
  epsId: number,
  isAuthorizer: number,
  StatusId: number,
  isFloating?: number
}

export interface FilterEmployee {
  rows: number,
  page: number,
  download: boolean,
  filter?: any
}

export interface FilterAuthorizer {
  devices: boolean,
  page: number,
  rows: number,
  download: boolean,
  filter?: any
}

export interface Confirmation {
  fullName: string,
  name: string,
  numberRead: number,
  dateRead: string
}
