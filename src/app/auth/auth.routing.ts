import { Routes } from '@angular/router';
import { HeadquartersComponent } from './headquarters/headquarters.component';
import { LoginComponent } from './login/login.component';
import { QrsiteComponent } from './qrsite/qrsite.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';

export const authRoute: Routes = [
	{ path: '', component: LoginComponent, data: { title: 'Ingresar a Sigga' } },
	{ path: 'register', component: RegisterComponent, data: { title: 'Crea tu cuenta' } },
	{ path: 'recovery', component: RecoveryComponent, data: { title: 'Recuperar Contraseña' } },
	{ path: 'qr/generate/:id', component: QrsiteComponent, data: { title: 'QR Autorizado' } },
	{ path: 'create/headquarters', component: HeadquartersComponent, data: { title: 'Registra tu Sede' } }
];
