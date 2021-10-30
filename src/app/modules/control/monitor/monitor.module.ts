import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomsModule } from '@app/shared/customs/customs.module';
import { SharedModule } from '@app/shared/shared.module';
import { ComponentsMonitorModule } from './components/components.module';
import { IndexMonitorComponent } from './index/index.component';
import { monitorRoute } from './monitor.routing';

@NgModule({
	declarations: [
		IndexMonitorComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		CustomsModule,
		ComponentsMonitorModule,
		RouterModule.forChild(monitorRoute)
	]
})
export class MonitorModule { }
