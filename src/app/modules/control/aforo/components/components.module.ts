import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardOfficesAforoComponent } from './card-offices-aforo/card-offices-aforo.component';
import { CardAforoMainComponent } from './card-aforo-main/card-aforo-main.component';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
	declarations: [
		CardOfficesAforoComponent,
		CardAforoMainComponent
	],
	imports: [
		CommonModule,
		PipesModule,
		SharedModule
	],
	exports: [
		CardOfficesAforoComponent,
		CardAforoMainComponent
	]
})
export class ComponentsAforoModule { }
