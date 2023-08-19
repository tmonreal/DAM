import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fechaFormat'
})
export class FechaFormatPipe implements PipeTransform {

  transform(value: string): string {
    const new_fecha = moment(value).utc().format("YYYY-MM-DD HH:mm:ss");
    return new_fecha;
  }


}