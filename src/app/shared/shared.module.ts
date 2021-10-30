import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinkModule } from 'ngx-quicklink';
import { PageModule } from './page/auth/page.module';
import { DashboardModule } from './page/dashboard/dashboard.module';
import { CustomsModule } from './customs/customs.module';
import { PrimeNgModule } from './primeng/prime.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuicklinkModule,
    PageModule,
    DashboardModule,
    CustomsModule,
    PrimeNgModule
  ],
  exports: [PageModule, DashboardModule, CustomsModule, PrimeNgModule]
})
export class SharedModule { }
