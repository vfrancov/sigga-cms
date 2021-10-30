import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { SharedModule } from '@app/shared/shared.module';
import { DashboardRoute } from './dashboard.routing';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		SharedModule,
		CoreModule,
		PipesModule,
		RouterModule.forChild(DashboardRoute)
	]
})
export class DashboardModule { }
