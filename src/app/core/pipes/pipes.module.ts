import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalculateAforoPipe } from './calculate-aforo.pipe';
import { LocalizationPipe } from './localization.pipe';
import { ModulefilterPipe } from './modulefilter.pipe';
import { SetNoDatePipe } from './set-no-date.pipe';
import { SetmessagechatPipe } from './setmessagechat.pipe';
import { TerminalStatusPipe } from './terminal-status.pipe';

@NgModule({
  declarations: [
    ModulefilterPipe,
    SetNoDatePipe,
    SetmessagechatPipe,
    CalculateAforoPipe,
    LocalizationPipe,
    TerminalStatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModulefilterPipe,
    SetNoDatePipe,
    SetmessagechatPipe,
    CalculateAforoPipe,
    LocalizationPipe,
    TerminalStatusPipe
  ]
})
export class PipesModule { }
