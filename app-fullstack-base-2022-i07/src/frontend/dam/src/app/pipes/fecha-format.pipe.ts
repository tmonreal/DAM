import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFormat'
})
export class FechaFormatPipe implements PipeTransform {

  transform(value: any): any {
    const new_fecha = new DatePipe('en-US');
    return new_fecha.transform(value, "dd-MM-yyyy HH:mm:ss", "UTC");
  }


}