import { Component, OnDestroy, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service'
import { MedicionService } from '../services/medicion.service'
import { Dispositivo } from 'app/model/Dispositivo';
import { Medicion } from 'app/model/Medicion';
import { LogRiegos } from 'app/model/LogRiegos';
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
public logRiegos = new LogRiegos(0, 0, '', 0);
public id_dispositivo: string;
public accion_electrovalvula: string;
public OpenEV: string = 'Abrir';
public CloseEV: string = 'Cerrar';
public Estado_Open: number = 1;
public Estado_Closed: number = 0;
public myChart: any;
private chartOptions: any;
  

  constructor(
    private router: ActivatedRoute, 
    private _dispositivoService: DispositivoService,  
    private _medicionService: MedicionService) { }

  async ngOnInit() {
    
    this.router.params.subscribe((params) => {
      this.dispositivoId = +params['id'];
      //console.log(this.dispositivoId);
    });

 
    this.medicion.dispositivoId = this.dispositivo.dispositivoId;
    this.logRiegos.apertura = this.Estado_Closed; 
    this.accion_electrovalvula = this.OpenEV;  
    
    await this._dispositivoService.getDispositivosById(this.dispositivoId)
    .then(dispo => {
      if (Array.isArray(dispo) && dispo.length > 0) {
        this.dispositivo = dispo[0]; 
        console.log('Dispositivo:', this.dispositivo);
        console.log('EV ID:', this.dispositivo.electrovalvulaId)
      }
      else {
        console.log('No Dispositivo data found.')
      }
        
      })      
      .catch((error) => {
        console.log('Error: ', error)
      })
      this.logRiegos.electrovalvulaId = this.dispositivo.electrovalvulaId;

    await this._medicionService.getLastMedicionById(this.dispositivoId)
    .then((med) => {
        if (Array.isArray(med) && med.length > 0) {
        // Get the first Medicion object from the array
        this.medicion = med[0];
        this.generarChart(this.medicion.valor);
        
        console.log('Medicion:', this.medicion);
        console.log(this.medicion.valor);
        
        
      } else {
        console.log('No Medicion data found.');
      }
    })
    .catch((error) => {
      console.log('Error:', error)
    })
    this.actualizarGrafica(Number(this.medicion.valor));
    
    
  }


  ngOnDestroy(): void {}

 actualizarGrafica(valor_medicion: number) {
    this.myChart.update({
        series: [{
            name: 'kPA',
            data: [valor_medicion],
            tooltip: {
                valueSuffix: ' kPA'
            }
        }]
    });
  }

generarChart(valor_medicion: number) {
  this.chartOptions = {
      chart: {
          type: 'gauge',
          plotBackgroundColor: '',
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
      }
      , title: {
          text: ' '
      }

      , credits: { enabled: false }


      , pane: {
          startAngle: -150,
          endAngle: 150
      }
      // the value axis
      , yAxis: {
          min: 0,
          max: 100,

          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',

          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
              step: 2,
              rotation: 'auto'
          },
          title: {
              text: 'kPA'
          },
          plotBands: [{
              from: 0,
              to: 10,
              color: '#55BF3B' // green
          }, {
              from: 10,
              to: 30,
              color: '#DDDF0D' // yellow
          }, {
              from: 30,
              to: 100,
              color: '#DF5353' // red
          }]
      }
      ,

      series: [{
          name: 'kPA',
          data: [valor_medicion],
          tooltip: {
              valueSuffix: ' kPA'
          }
      }],
      accessibility: {
        enabled: false
      }

  };
  this.myChart = Highcharts.chart('highcharts', this.chartOptions);
}

clickElectrovalvula() {
  let current_datetime = moment().format("YYYY-MM-DD HH:mm:ss");
  let intervalObj: NodeJS.Timeout | null = null; 

  if (this.accion_electrovalvula === this.OpenEV) {

      this.logRiegos.fecha = current_datetime;
      this.logRiegos.apertura = this.Estado_Open;
      this._medicionService.addLogRiego(this.logRiegos); // Si abro la EV guardo el valor de cierre del riego

      this.accion_electrovalvula = this.CloseEV;
      this.medicion.valor = Math.floor(Math.random() * 100);
      this.actualizarGrafica(this.medicion.valor);

      intervalObj = setInterval(() => {

          if (this.medicion.valor == 0 || this.logRiegos.apertura == this.Estado_Closed) {
            if (intervalObj) {
              clearInterval(intervalObj); 
              intervalObj = null;
            }
          } else {
              this.medicion.valor--;
              this.actualizarGrafica(this.medicion.valor);
          }
      }, 1000);
  } else {    
      this.logRiegos.fecha = current_datetime;
      this.logRiegos.apertura = this.Estado_Closed;
      this.medicion.fecha = current_datetime;

      this.accion_electrovalvula = this.OpenEV;
      console.log('Add Log riego'+ this.logRiegos)
      this._medicionService.addLogRiego(this.logRiegos); // Si cierro la EV guardo el valor de cierre del riego
      this._medicionService.addMedicion(this.medicion); // Si cierro la EV guardo valor en Mediciones!
      
  }
}

}