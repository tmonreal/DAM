import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DispositivosPageRoutingModule } from './dispositivos-routing.module';
import { DispositivosPage } from './dispositivos.page';
import { ColoredBackDirective } from 'app/directives/colored-back.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispositivosPageRoutingModule
  ],
  declarations: [DispositivosPage, ColoredBackDirective],
  exports: [ColoredBackDirective]
})
export class DispositivosPageModule {}
