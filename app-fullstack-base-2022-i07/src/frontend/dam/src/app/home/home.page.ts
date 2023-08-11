import { Component } from '@angular/core';
import { DispositivoService } from 'app/services/dispositivo.service';
import { Dispositivo } from 'app/interfaces/dispositivo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listadoDispositivos: Dispositivo[] = [];

  constructor(public dispositivoService: DispositivoService) {
    dispositivoService.getListadoDispositivos().then(lst => {
      this.listadoDispositivos = lst;
    })
  }

}
