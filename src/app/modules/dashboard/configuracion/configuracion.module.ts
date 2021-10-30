import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomsModule } from '@app/shared/customs/customs.module';
import { SharedModule } from '@app/shared/shared.module';
import { configRoutes } from './configuracion.routing';
import { IndexConfiguracionComponent } from './index/index.component';

@NgModule({
	declarations: [
		IndexConfiguracionComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		CustomsModule,
		ReactiveFormsModule,
		FormsModule,
		RouterModule.forChild(configRoutes)
	]
})
export class ConfiguracionModule { }
