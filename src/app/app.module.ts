import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { QuicklinkModule } from 'ngx-quicklink';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { config } from './core/constants/socket';
import { authInterceptorProvider } from './core/interceptors/httpconfig.service';
import { UiserviceService } from './core/services/control';
import { SharedModule } from './shared/shared.module';
import { rootReducers } from './stores';
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
    BrowserAnimationsModule,
		AppRoutingModule,
		QuicklinkModule,
		SharedModule,
		StoreModule.forRoot(rootReducers),
		SocketIoModule.forRoot(config),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production
		})
	],
	providers: [UiserviceService, authInterceptorProvider],
	bootstrap: [AppComponent]
})
export class AppModule { }
