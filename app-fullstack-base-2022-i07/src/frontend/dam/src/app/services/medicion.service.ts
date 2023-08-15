import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  constructor(private _http: HttpClient) { }

  // getMedicion (id: number): Promise<any>{
  //   console.log('getMedicion')
  //   return firstValueFrom(this._http.get('http://localhost:8000/medicion/'))
  // }

  getMedicion (): Promise<any>{
    return firstValueFrom(this._http.get('http://localhost:8000/medicion/'))
  }

  getMedicionById (id: number): Promise<any>{
    return firstValueFrom(this._http.get('http://localhost:8000/medicion/'+id))
    .then((medicion) => {
      return medicion;
    })
    .catch((error) => {
      console.log('Error in getMedicionById:', error);
      return null;
    });
  }
}
