import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dispositivo } from 'app/model/Dispositivo';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http: HttpClient) { }

  getListadoDispositivos (): Promise<any> {
    return firstValueFrom(this._http.get('http://localhost:8000/dispositivo/'))
  }

  getDispositivosById (id: number): Promise<any> {
    return firstValueFrom(this._http.get('http://localhost:8000/dispositivo/' + id))
    .then((dispositivo) => {
      return dispositivo;
    })
    .catch((error) => {
      console.log('Error in getDispositivosById:', error);
      return null;
    });
  }
}