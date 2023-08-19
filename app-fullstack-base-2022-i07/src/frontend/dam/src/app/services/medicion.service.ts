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
  
  async getLastMedicionById (id: number): Promise<Medicion>{
    console.log('getLastMedicionById')
    try {
      const medicion = await firstValueFrom(this._http.get('http://localhost:8000/medicion/last/' + id));
      return medicion as Medicion;
    } catch (error) {
      console.log('Error in getMedicionById:', error);
      return new Medicion(0, '', 0, 0);
    }
  }

  async getMedicionesById (id: number): Promise<Medicion[]>{
    console.log('getMedicionesById');
    try {
      const mediciones = await firstValueFrom(this._http.get('http://localhost:8000/medicion/' + id));
      console.log(mediciones);
      return mediciones as Medicion[];
    } catch (error) {
      console.log('Error in getMedicionById:', error);
      return [];
    }
  }

  async addMedicion (medicion: Medicion){
    console.log('addMedicion');
    console.log(medicion)
    try {
      const resMedicion = await firstValueFrom(this._http.post('http://localhost:8000/medicion/new',
        { fecha: medicion.fecha, valor: medicion.valor, dispositivoId: medicion.dispositivoId }));
      console.log(resMedicion);
      return resMedicion;
    } catch (error) {
      console.log('Error in addMedicion: ', error);
      return null;
    }
  }


   async getLogByElectrovalvulaId (id: number): Promise<LogRiegos[]>{
    console.log('getLogByElectrovalvulaId')
    console.log('ElectrovalvulaId:'+ id)
    try {
       const logRiego = await firstValueFrom(this._http.get('http://localhost:8000/medicion/logRiegos/' + id));
       console.log(logRiego);
       return logRiego as LogRiegos[];
     } catch (error) {
       console.log('Error in getLogByElectrovalvulaId:', error);
       return [];
     }
  }

  async addLogRiego (logRiego: LogRiegos): Promise<any>{
    console.log('addLogRiego')
    console.log(logRiego)
    try {
      const reslogRiego = await firstValueFrom(this._http.post('http://localhost:8000/medicion/logRiegos/new/',
        { fecha: logRiego.fecha, apertura: logRiego.apertura, electrovalvulaId: logRiego.electrovalvulaId }));
      console.log(reslogRiego);
      return logRiego;
    } catch (error) {
      console.log('Error in addLogRiego:', error);
      return null;
    }
  }

}
