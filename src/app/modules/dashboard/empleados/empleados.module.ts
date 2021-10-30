import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { ComponentsEmployeesModule } from './components/components.module';
import { empleadoRoute } from './empleados.routing';
import { IndexEmpleadosComponent } from './index/index.component';

@NgModule({
	declarations: [
		IndexEmpleadosComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
		ComponentsEmployeesModule,
		RouterModule.forChild(empleadoRoute)
	],
	providers :  [
		FormBuilderTypeSafe
	]
})
export class EmpleadosModule { }
