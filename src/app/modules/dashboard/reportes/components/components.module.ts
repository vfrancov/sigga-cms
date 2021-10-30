import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AforoComponent } from './aforo/aforo.component';
import { SharedModule } from '@app/shared/shared.module';
import { TrackingComponent } from './tracking/tracking.component';
import { PipesModule } from '@app/core/pipes/pipes.module';

@NgModule({
	declarations: [GeneralComponent, AforoComponent, TrackingComponent],
	imports: [
		CommonModule,
		FontAwesomeModule,
		SharedModule,
		PipesModule
	],
	exports: [GeneralComponent]
})
export class ComponentsReportesModule { }
