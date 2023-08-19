import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogRiegosPageRoutingModule } from './log-riegos-routing.module';

import { LogRiegosPage } from './log-riegos.page';
import { FechaFormatPipe } from 'app/pipes/fecha-format.pipe';
import { AperturaStatusPipe } from 'app/pipes/apertura-status.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogRiegosPageRoutingModule
  ],
  declarations: [LogRiegosPage, FechaFormatPipe, AperturaStatusPipe]
})
export class LogRiegosPageModule {}
