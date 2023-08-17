import { Component } from '@angular/core';
import { Dispositivo } from 'app/model/Dispositivo';
import { DispositivoService } from 'app/services/dispositivo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dispositivos: Dispositivo[];

  constructor(private DispositivoService: DispositivoService) {
    DispositivoService.getListadoDispositivos()
    .then(listdispo => { this.dispositivos = listdispo}
      )
  }

}
