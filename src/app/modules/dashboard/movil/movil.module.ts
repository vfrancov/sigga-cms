import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { ComponentMovilModule } from './components/components.module';
import { IndexMovilComponent } from './index/index.component';
import { movilRoutes } from './movil.routing';

@NgModule({
	declarations: [IndexMovilComponent],
	imports: [
		CommonModule,
		SharedModule,
		ComponentMovilModule,
		RouterModule.forChild(movilRoutes)
	]
})
export class MovilModule { }
