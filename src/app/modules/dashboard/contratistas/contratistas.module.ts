import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomsModule } from '@app/shared/customs/customs.module';
import { SharedModule } from '@app/shared/shared.module';
import { CardAddMemberComponent } from './components/card-add-member/card-add-member.component';
import { CardContratistaDetallesComponent } from './components/card-contratista-detalles/card-contratista-detalles.component';
import { CardContratistasMembersComponent } from './components/card-contratistas-members/card-contratistas-members.component';
import { CardCreateContratistaComponent } from './components/card-create-contratista/card-create-contratista.component';
import { CardDetalleContratistasComponent } from './components/card-detalle-contratistas/card-detalle-contratistas.component';
import { CardEditContratistaComponent } from './components/card-edit-contratista/card-edit-contratista.component';
import { CardEmpresasContratistasComponent } from './components/card-empresas-contratistas/card-empresas-contratistas.component';
import { contratistasRoutes } from './contratistas.routing';
import { IndexContratistasComponent } from './index/index.component';
import { CardVisitContratistasComponent } from './components/card-visit-contratistas/card-visit-contratistas.component';
import { CardIoContratistasComponent } from './components/card-io-contratistas/card-io.component';

@NgModule({
	declarations: [
		IndexContratistasComponent,
		CardDetalleContratistasComponent,
		CardEmpresasContratistasComponent,
		CardContratistaDetallesComponent,
		CardContratistasMembersComponent,
		CardCreateContratistaComponent,
		CardEditContratistaComponent,
		CardAddMemberComponent,
		CardVisitContratistasComponent,
		CardIoContratistasComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		SharedModule,
		CustomsModule,
		RouterModule.forChild(contratistasRoutes)
	]
})
export class ContratistasModule { }
