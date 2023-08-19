import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, fromEvent, interval, map } from 'rxjs';
import { DispositivoService } from '../services/dispositivo.service'
import { MedicionService } from '../services/medicion.service'
import { Dispositivo } from 'app/model/Dispositivo';
import { Medicion } from 'app/model/Medicion';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})

export class DispositivosPage implements OnInit, OnDestroy {
public dispositivo = new Dispositivo(0, " ", " ", 0);
public medicion = new Medicion(0, " ", 0, 0);
public dispositivoId: number;
  

  constructor(
    private router: ActivatedRoute, 
    private _dispositivoService: DispositivoService,  
    private _medicionService: MedicionService) { }

  async ngOnInit() {
    
    this.router.params.subscribe((params) => {
      this.dispositivoId = +params['id'];
      //console.log(this.dispositivoId);
    });

    await this._dispositivoService.getDispositivosById(this.dispositivoId)
    .then(dispo => {
        this.dispositivo = dispo; 
        console.log(this.dispositivo);})
      
    .catch((error) => {
      console.log('Error: ', error)
    })

    await this._medicionService.getLastMedicionById(this.dispositivoId)
    .then((med) => {
        if (Array.isArray(med) && med.length > 0) {
        // Get the first Medicion object from the array
        this.medicion = med[0];
        console.log('Medicion:', this.medicion);
        console.log(this.medicion.valor);
      } else {
        console.log('No Medicion data found.');
      }
    })
    .catch((error) => {
      console.log('Error:', error)
    })
    console.log('Assigned Medicion:', this.medicion);
  }

  subscribe () { }

  unsubscribe () {}

  ngOnDestroy(): void {}
}

