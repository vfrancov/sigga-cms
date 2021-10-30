import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { PipesModule } from '@app/core/pipes/pipes.module';

@NgModule({
	declarations: [
		SidebarComponent,
		TopbarComponent
	],
	imports: [
		CommonModule,
		RouterModule,
    PipesModule
	],
	exports: [
		SidebarComponent,
		TopbarComponent
	]
})
export class DashboardModule { }
