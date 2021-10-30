import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { controlRoute } from './control.routing';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		CoreModule,
		RouterModule.forChild(controlRoute)
	]
})
export class ControlModule { }
