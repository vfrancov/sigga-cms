import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { AlertComponent } from './alert/alert.component';
import { CardCrudComponent } from './card-crud/card-crud.component';
import { CardTotalsComponent } from './card-totals/card-totals.component';
import { ComboboxComponent } from './combobox/combobox.component';
import { DataTablesComponent } from './data-tables/data-tables.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { InnerHeaderComponent } from './inner-header/inner-header.component';
import { LogsEntryOutComponent } from './logs-entry-out/logs-entry-out.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';

@NgModule({
	declarations: [
		AlertComponent,
		InnerHeaderComponent,
		ComboboxComponent,
		CardCrudComponent,
		CardTotalsComponent,
		LogsEntryOutComponent,
		GraphicsComponent,
		DataTablesComponent,
		ModalContainerComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		PipesModule
	],
	exports: [
		InnerHeaderComponent,
		ComboboxComponent,
		AlertComponent,
		CardCrudComponent,
		CardTotalsComponent,
		LogsEntryOutComponent,
		GraphicsComponent,
		DataTablesComponent,
		ModalContainerComponent
	]
})
export class CustomsModule { }
