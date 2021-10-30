import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardConfigMovilComponent } from './card-config-movil/card-config-movil.component';
import { CardSetConfigComponent } from './card-set-config/card-set-config.component';
import { CustomsModule } from '@app/shared/customs/customs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		CardConfigMovilComponent,
		CardSetConfigComponent
	],
	imports: [
		CommonModule,
		CustomsModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [
		CardConfigMovilComponent,
		CardSetConfigComponent
	]
})
export class ComponentMovilModule { }
