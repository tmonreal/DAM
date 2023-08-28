import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaFormatPipe } from './pipes/fecha-format.pipe';


@NgModule({
  declarations: [FechaFormatPipe],
  imports: [
    CommonModule
  ],
  exports: [FechaFormatPipe]
})
export class SharedModuleModule { }
