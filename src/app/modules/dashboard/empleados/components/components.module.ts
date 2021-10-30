import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { CustomsModule } from '@app/shared/customs/customs.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CardAddEmpleadoComponent } from './card-add-empleado/card-add-empleado.component';
import { CardCompanyEditComponent } from './card-company-edit/card-company-edit.component';
import { CardDetalleEmpresaComponent } from './card-detalle-empresa/card-detalle-empresa.component';
import { CardEditEmpleadoComponent } from './card-edit-empleado/card-edit-empleado.component';
import { CardEmployeeDetailComponent } from './card-employee-detail/card-employee-detail.component';
import { CardListEmpleadosComponent } from './card-list-empleados/card-list-empleados.component';
import { CardModalControlComponent } from './card-modal-control/card-modal-control.component';
import { CardResumeEmpleadosComponent } from './card-resume-empleados/card-resume-empleados.component';
import { CardSedesAddComponent } from './card-sedes-add/card-sedes-add.component';

@NgModule({
	declarations: [
		CardDetalleEmpresaComponent,
		CardListEmpleadosComponent,
		CardAddEmpleadoComponent,
		CardResumeEmpleadosComponent,
		CardSedesAddComponent,
		CardCompanyEditComponent,
		CardEmployeeDetailComponent,
		CardEditEmpleadoComponent,
		CardModalControlComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
		CustomsModule,
		NgMultiSelectDropDownModule.forRoot(),
    PipesModule
	],
	exports: [
		CardDetalleEmpresaComponent,
		CardListEmpleadosComponent,
		CardAddEmpleadoComponent,
		CardResumeEmpleadosComponent,
		CardSedesAddComponent,
		CardCompanyEditComponent,
		CardEmployeeDetailComponent,
		CardEditEmpleadoComponent,
		CardModalControlComponent
	]
})
export class ComponentsEmployeesModule { }
