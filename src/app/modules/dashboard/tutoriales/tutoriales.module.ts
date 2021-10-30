import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexTutorialComponent } from './index/index.component';
import { tutorialesRoutes } from './tutoriales.routing';

@NgModule({
  declarations: [IndexTutorialComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(tutorialesRoutes)
  ]
})
export class TutorialesModule { }
