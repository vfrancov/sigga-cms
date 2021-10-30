import { CompanyService } from './company.service';
import { ConfiguracionService } from './configuracion.service';
import { ContratistasService } from './contratistas.service';
import { CoreService } from './core.service';
import { EmployeesService } from './employees.service';
import { GraphicsService } from './graphics.service';
import { OfficesService } from './offices.service';
import { ReportesService } from './reportes.service';
import { SedesService } from './sedes.service';
import { SocketService } from './socket.service';
import { TerminalesService } from './terminales.service';
import { TowersService } from './towers.service';
import { UserService } from './user.service';

export * from './company.service';
export * from './configuracion.service';
export * from './contratistas.service';
export * from './core.service';
export * from './employees.service';
export * from './graphics.service';
export * from './offices.service';
export * from './reportes.service';
export * from './sedes.service';
export * from './socket.service';
export * from './terminales.service';
export * from './towers.service';
export * from './user.service';

export const DASHBOARD = [
	CompanyService,
	OfficesService,
	SedesService,
	TowersService,
	UserService,
	EmployeesService,
	ContratistasService,
	TerminalesService,
	CoreService,
	ConfiguracionService,
	SocketService,
	ReportesService,
	GraphicsService
]
