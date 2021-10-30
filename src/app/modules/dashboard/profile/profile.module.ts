import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexProfileComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { routeProfile } from './profile.routing';

@NgModule({
	declarations: [IndexProfileComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routeProfile)
	]
})
export class ProfileModule { }
