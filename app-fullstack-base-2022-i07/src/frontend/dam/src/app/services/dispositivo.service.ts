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

  async getDispositivosById (id: number): Promise<any> {
    try {
      const dispositivo = await firstValueFrom(this._http.get('http://localhost:8000/dispositivo/' + id));
      return dispositivo;
    } catch (error) {
      console.log('Error in getDispositivosById:', error);
      return null;
    }
  }
}