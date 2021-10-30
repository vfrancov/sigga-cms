import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomsModule } from '@app/shared/customs/customs.module';
import { SharedModule } from '@app/shared/shared.module';
import { FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { CardAddUserterminalComponent } from './components/card-add-userterminal/card-add-userterminal.component';
import { CardListModulesComponent } from './components/card-list-modules/card-list-modules.component';
import { CardListTerminalesComponent } from './components/card-list-terminales/card-list-terminales.component';
import { IndexTerminalComponent } from './index/index.component';
import { terminalsRoutes } from './terminales.routing';
import { CardAddModuleconfigComponent } from './components/card-add-moduleconfig/card-add-moduleconfig.component';
import { PipesModule } from '@app/core/pipes/pipes.module';

@NgModule({
	declarations: [
		IndexTerminalComponent,
		CardListTerminalesComponent,
		CardListModulesComponent,
		CardAddUserterminalComponent,
		CardAddModuleconfigComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		SharedModule,
		CustomsModule,
		PipesModule,
		RouterModule.forChild(terminalsRoutes)
	],
	providers: [
		FormBuilderTypeSafe
	]
})
export class TerminalesModule { }
