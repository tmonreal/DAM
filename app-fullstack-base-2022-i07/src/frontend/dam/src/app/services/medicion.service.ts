import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicion } from 'app/model/Medicion';
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

}
