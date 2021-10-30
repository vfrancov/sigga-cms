import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { QuicklinkStrategy } from 'ngx-quicklink';

const appRoute: Routes = [
	{ path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
	{ path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
	{ path: '', loadChildren: () => import('./modules/control/control.module').then(m => m.ControlModule) }
];

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule.forRoot(appRoute, {
    enableTracing: false,
    preloadingStrategy: QuicklinkStrategy,
    relativeLinkResolution: 'legacy'
})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
