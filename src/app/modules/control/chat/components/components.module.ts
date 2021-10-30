import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { CardUsersChatComponent } from './card-users-chat/card-users-chat.component';
import { CardUsersListComponent } from './card-users-list/card-users-list.component';

@NgModule({
	declarations: [
		CardUsersListComponent,
		CardUsersChatComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		PipesModule
	],
	exports: [
		CardUsersListComponent,
		CardUsersChatComponent
	]
})
export class ComponentsChatModule { }
