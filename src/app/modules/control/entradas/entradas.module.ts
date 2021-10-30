import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { ComponentsEntrysModule } from './components/components.module';
import { entradasRoute } from './entradas.routing';
import { IndexEntrysComponent } from './index/index.component';

@NgModule({
	declarations: [
		IndexEntrysComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		ComponentsEntrysModule,
		RouterModule.forChild(entradasRoute)
	]
})
export class EntradasModule { }
