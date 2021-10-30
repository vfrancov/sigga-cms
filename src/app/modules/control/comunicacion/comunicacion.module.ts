import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { ComponentsComunicacionModule } from './components/components.module';
import { comunicationRoutes } from './comunicacion.routing';
import { IndexComunicacionComponent } from './index/index.component';

@NgModule({
	declarations: [
		IndexComunicacionComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		ComponentsComunicacionModule,
		RouterModule.forChild(comunicationRoutes)
	]
})
export class ComunicacionModule { }
