import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { ContratistasComponent } from './contratistas/contratistas.component';
import { CustomsModule } from '@app/shared/customs/customs.module';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		EmployeesComponent,
		VisitorsComponent,
		ContratistasComponent
	],
	imports: [
		CommonModule,
		CustomsModule,
    PipesModule,
    FormsModule
	],
	exports : [
		EmployeesComponent,
		VisitorsComponent,
		ContratistasComponent
	]
})
export class ComponentsMonitorModule { }
