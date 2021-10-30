import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustomsModule } from "@app/shared/customs/customs.module";
import { SharedModule } from "@app/shared/shared.module";
import { IndexUnidadComponent } from "./index/index.component";
import { unitRoutes } from "./unidad.routing";
import { AppCardAptosComponent } from './components/app-card-aptos/app-card-aptos.component';
import { AppCardResidentsComponent } from './components/app-card-residents/app-card-residents.component';
import { AppCardDetailsComponent } from './components/app-card-details/app-card-details.component';
import { AppCardInfoHeaderComponent } from './components/app-card-info-header/app-card-info-header.component';

@NgModule({
  declarations: [
    IndexUnidadComponent,
    AppCardAptosComponent,
    AppCardResidentsComponent,
    AppCardDetailsComponent,
    AppCardInfoHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CustomsModule,
    RouterModule.forChild(unitRoutes)
  ]
})
export class UnidadModule { }
