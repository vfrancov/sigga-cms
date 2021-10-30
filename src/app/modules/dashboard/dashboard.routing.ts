import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const DashboardRoute: Routes = [
  {
    path: 'dashboard/home',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./empleados/empleados.module').then(m => m.EmpleadosModule)
      },
      {
        path: '',
        loadChildren: () => import('./oficinas/oficinas.module').then(m => m.OficinasModule)
      },
      {
        path: '',
        loadChildren: () => import('./contratistas/contratistas.module').then(m => m.ContratistasModule)
      },
      {
        path: '',
        loadChildren: () => import('./terminales/terminales.module').then(m => m.TerminalesModule)
      },
      {
        path: '',
        loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionModule)
      },
      {
        path: '',
        loadChildren: () => import('./movil/movil.module').then(m => m.MovilModule)
      },
      {
        path: '',
        loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule)
      },
      {
        path: '',
        loadChildren: () => import('./graphics/graphics.module').then(m => m.GraphicsModule)
      },
      {
        path: '',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: '',
        loadChildren: () => import('./tutoriales/tutoriales.module').then(m => m.TutorialesModule)
      },
      {
        path: '',
        loadChildren: () => import('./unidad/unidad.module').then(m => m.UnidadModule)
      }
    ]
  }
]
