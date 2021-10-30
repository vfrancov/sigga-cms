import { Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';

export const controlRoute: Routes = [
	{
		path: 'dashboard/control',
		component: HomeComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./entradas/entradas.module').then(m => m.EntradasModule)
			},
			{
				path: '',
				loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule)
			},
			{
				path: '',
				loadChildren: () => import('./aforo/aforo.module').then(m => m.AforoModule)
			},
			{
				path: '',
				loadChildren: () => import('./comunicacion/comunicacion.module').then(m => m.ComunicacionModule)
			},
			{
				path: '',
				loadChildren: () => import('./comunicacion/comunicacion.module').then(m => m.ComunicacionModule)
			},
			{
				path: '',
				loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
			}
		]
	}
]
