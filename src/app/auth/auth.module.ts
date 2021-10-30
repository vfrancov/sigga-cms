import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { authRoute } from './auth.routing';
import { HeadquartersComponent } from './headquarters/headquarters.component';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { QrsiteComponent } from './qrsite/qrsite.component';

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		RecoveryComponent,
		HeadquartersComponent,
		QrsiteComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(authRoute),
		SharedModule,
		CoreModule
	]
})
export class AuthModule { }
