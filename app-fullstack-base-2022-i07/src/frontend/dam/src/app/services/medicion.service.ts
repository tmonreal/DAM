import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicion } from 'app/model/Medicion';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  constructor(private _http: HttpClient) { }
  
  getMedicion (): Promise<any>{
    return firstValueFrom(this._http.get('http://localhost:8000/medicion/'))
  }

  getMedicionesById (id: number): Promise<Medicion[]>{
    console.log('getMedicionesByIdDispositivo')
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
