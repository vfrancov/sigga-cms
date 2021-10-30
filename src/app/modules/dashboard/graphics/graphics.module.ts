import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { graphicRoutes } from './graphics.routing';
import { IndexGraphicComponent } from './index/index.component';

@NgModule({
	declarations: [IndexGraphicComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(graphicRoutes)
	]
})
export class GraphicsModule { }
