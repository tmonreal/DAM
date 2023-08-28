import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogRiegosPageRoutingModule } from './log-riegos-routing.module';

import { LogRiegosPage } from './log-riegos.page';
import { AperturaStatusPipe } from 'app/pipes/apertura-status.pipe';
import { SharedModuleModule } from 'app/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogRiegosPageRoutingModule,
    SharedModuleModule
  ],
  declarations: [LogRiegosPage, AperturaStatusPipe]
})
export class LogRiegosPageModule {}
