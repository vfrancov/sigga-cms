import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomsModule } from '@app/shared/customs/customs.module';
import { SharedModule } from '@app/shared/shared.module';
import { CardDetalleOficinasComponent } from './components/card-detalle-oficinas/card-detalle-oficinas.component';
import { CardListOficinasComponent } from './components/card-list-oficinas/card-list-oficinas.component';
import { CardTowersComponent } from './components/card-towers/card-towers.component';
import { IndexOfficeComponent } from './index/index.component';
import { officeRoutes } from './oficinas.routing';
import { AddComponent } from './components/card-towers/add/add.component';
import { ReadComponent } from './components/card-towers/read/read.component';
import { CardOfficeComponent } from './components/card-office/card-office.component';
import { CardMembersComponent } from './components/card-members/card-members.component';
import { CardCreateOfficeComponent } from './components/card-create-office/card-create-office.component';
import { CardListEmployeesComponent } from './components/card-list-employees/card-list-employees.component';
import { CardVisitsOfficesComponent } from './components/card-visits-offices/card-visits-offices.component';
import { CardIoComponent } from './components/card-io/card-io.component';
import { PipesModule } from '@app/core/pipes/pipes.module';

@NgModule({
	declarations: [
		IndexOfficeComponent,
		CardDetalleOficinasComponent,
		CardListOficinasComponent,
		CardTowersComponent,
		AddComponent,
		ReadComponent,
		CardOfficeComponent,
		CardMembersComponent,
		CardCreateOfficeComponent,
		CardListEmployeesComponent,
		CardVisitsOfficesComponent,
		CardIoComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		SharedModule,
		CustomsModule,
		RouterModule.forChild(officeRoutes),
    PipesModule
	]
})
export class OficinasModule { }
