import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomsModule } from '@app/shared/customs/customs.module';
import { SharedModule } from '@app/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ComponentsReportesModule } from './components/components.module';
import { IndexReportesComponent } from './index/index.component';
import { reportRoutes } from './reportes.routing';

@NgModule({
  declarations: [IndexReportesComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsReportesModule,
    SharedModule,
    CustomsModule,
    TableModule,
    MultiSelectModule,
    CalendarModule,
    RouterModule.forChild(reportRoutes)
  ]
})
export class ReportesModule { }
