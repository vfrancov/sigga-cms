import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { aforoRoutes } from './aforo.routing';
import { ComponentsAforoModule } from './components/components.module';
import { IndexAforoComponent } from './index/index.component';
@NgModule({
	declarations: [
		IndexAforoComponent
	],
	imports: [
		CommonModule,
		ComponentsAforoModule,
		SharedModule,
		RouterModule.forChild(aforoRoutes)
	]
})
export class AforoModule { }
