import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { CustomsModule } from '@app/shared/customs/customs.module';
import { CardAuthorizerListComponent } from './card-authorizer-list/card-authorizer-list.component';
import { CardRequestAuthComponent } from './card-request-auth/card-request-auth.component';
import { CardVisitsListComponent } from './card-visits-list/card-visits-list.component';

@NgModule({
	declarations: [
		CardAuthorizerListComponent,
		CardVisitsListComponent,
		CardRequestAuthComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		CustomsModule,
		PipesModule
	],
	exports: [
		CardAuthorizerListComponent,
		CardVisitsListComponent,
		CardRequestAuthComponent
	]
})
export class ComponentsEntrysModule { }
