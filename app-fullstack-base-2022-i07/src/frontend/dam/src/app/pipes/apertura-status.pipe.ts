import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aperturaStatus'
})
export class AperturaStatusPipe implements PipeTransform {

  transform(value: number): string {
    return value === 1 ? 'Abierta' : 'Cerrada';
  }

}
