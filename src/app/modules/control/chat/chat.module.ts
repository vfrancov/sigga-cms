import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { chatRoute } from './chat.routing';
import { ComponentsChatModule } from './components/components.module';
import { IndexChatComponent } from './index/index.component';

@NgModule({
	declarations: [
		IndexChatComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		ComponentsChatModule,
		RouterModule.forChild(chatRoute)
	]
})
export class ChatModule { }
