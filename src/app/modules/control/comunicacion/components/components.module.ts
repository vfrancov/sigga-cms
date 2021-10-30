import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardCreateComunicationComponent } from './card-create-comunication/card-create-comunication.component';
import { CardPublicationsConfirmationComponent } from './card-publications-confirmation/card-publications-confirmation.component';
import { CardPublicationsRegisteredComponent } from './card-publications-registered/card-publications-registered.component';
import { CardEmployeeListComponent } from './card-employee-list/card-employee-list.component';
import { CustomsModule } from '@app/shared/customs/customs.module';

@NgModule({
	declarations: [
		CardPublicationsRegisteredComponent,
		CardPublicationsConfirmationComponent,
		CardCreateComunicationComponent,
		CardEmployeeListComponent
	],
	imports: [
		CommonModule,
		CustomsModule,
		ReactiveFormsModule,
		FormsModule
	],
	exports: [
		CardPublicationsRegisteredComponent,
		CardPublicationsConfirmationComponent,
		CardCreateComunicationComponent,
		CardEmployeeListComponent
	]
})
export class ComponentsComunicacionModule { }
