export interface OfficeAll {
  list: Array<Office>,
  records: string,
  pages: string,
  fileName: any
}
export interface Office {
  id: number,
  towersId: number,
  name: string,
  numOffices: string,
  floor: string,
  capacity: number,
  capacityPerHours: number
}

export interface OfficeDetails {
  id: number,
  name: string,
  statusName: string,
  towersId: number,
  towersName: string,
  numOffices: string,
  floor: string,
  capacity: number,
  capacityPerHours: number
}

export interface OfficeUpdate {
  name: string,
  numOffices: string,
  floor: string,
  capacity: number,
  capacityPerHours: number,
  statusId: number
}

export interface Filter {
  rows: number,
  page: number,
  download: boolean,
  filter?: any,
  filterDate?: any,
  devices?: boolean,
  order?:string,
  sort?:any
}

export interface CardOffices {
  show: boolean,
  name: string
}

export interface CardEditOffices {
  show: boolean,
  name: string,
  hasData?: any
}

export interface ReloadStatus {
  reload: boolean,
  list: string,
  id?: number
}

export interface OfficeMembers {
  list: Array<Member>,
  records: string,
  pages: string,
  fileName: any
}

export interface Member {
  id: number,
  numDocument: string,
  fullName: string
}

export interface OfficeAllEmployee {
  list: Array<MemberOffice>,
  records: string,
  pages: string,
  fileName: any
}

export interface MemberOffice {
  id: number,
  numDocument: string,
  fullName: string,
  sedeName: string,
  towerName: string,
  officeName: string,
  floor: number
}
