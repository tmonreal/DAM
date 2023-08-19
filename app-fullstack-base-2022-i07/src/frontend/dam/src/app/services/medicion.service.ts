import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogRiegos } from 'app/model/LogRiegos';
import { Medicion } from 'app/model/Medicion';
import { log } from 'console';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  constructor(private _http: HttpClient) { }
  
  getLastMedicionById (id: number): Promise<Medicion>{
    console.log('getLastMedicionById')
    return firstValueFrom(this._http.get('http://localhost:8000/medicion/last/' + id ))
    .then((medicion) => {
      return medicion as Medicion;
    })
    .catch((error) => {
      console.log('Error in getMedicionById:', error);
      return new Medicion(0, '', 0, 0);
    });
  }

  getMedicionesById (id: number): Promise<Medicion[]>{
    console.log('getMedicionesById')
    return firstValueFrom(this._http.get('http://localhost:8000/medicion/' + id))
    .then((mediciones) => {
      console.log(mediciones)
      return mediciones as Medicion[];
    })
    .catch((error) => {
      console.log('Error in getMedicionById:', error);
      return [];
    });
  }

   getLogByElectrovalvulaId (id: number): Promise<LogRiegos[]>{
    console.log('getLogByElectrovalvulaId')
    console.log('ElectrovalvulaId:'+ id)
    return firstValueFrom(this._http.get('http://localhost:8000/medicion/logRiegos/' + id))
    .then((logRiego) => {
      console.log(logRiego)
      return logRiego as LogRiegos[];
    })
    .catch((error) => {
      console.log('Error in getLogByElectrovalvulaId:', error);
      return [];
    });
  }

  addLogRiego (logRiego: LogRiegos): Promise<any>{
    console.log('addLogRiego')
    console.log(logRiego)
    return firstValueFrom(this._http.post('http://localhost:8000/medicion/logRiegos/new/', 
                          {fecha: logRiego.fecha, apertura: logRiego.apertura, electrovalvulaId: logRiego.electrovalvulaId}))
    .then((reslogRiego) => {
      console.log(reslogRiego)
      return logRiego;
    })
    .catch((error) => {
      console.log('Error in addLogRiego:', error);
      return null;
    });
  }

}
