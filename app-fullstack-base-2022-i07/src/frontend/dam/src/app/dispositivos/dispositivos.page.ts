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
public ABRIR_ELECTROVALVULA: string = 'Abrir';
public CERRAR_ELECTROVALVULA: string = 'Cerrar';
public ELECTROVALVULA_ABIERTA: number = 1;
public ELECTROVALVULA_CERRADA: number = 0;
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
    this.logRiegos.apertura = this.ELECTROVALVULA_CERRADA;    // arranca con la electrovalvula cerrada
    this.accion_electrovalvula = this.ABRIR_ELECTROVALVULA;   // asigno ABRIR al boton de accionamiento de electrovalvula
    
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
      console.log('EV ' + this.dispositivo.electrovalvulaId);

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
    console.log('Assigned Medicion:', this.medicion);
    this.actualizarGrafica(Number(this.medicion.valor));
    
    
  }


  ngOnDestroy(): void {}

 actualizarGrafica(valor_medicion: number) {
  console.log('actualizar', valor_medicion)
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
  console.log('generar chart:', valor_medicion)
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

  if (this.accion_electrovalvula === this.ABRIR_ELECTROVALVULA) {

      this.logRiegos.fecha = current_datetime;
      this.logRiegos.apertura = this.ELECTROVALVULA_ABIERTA;
      this._medicionService.addLogRiego(this.logRiegos);

      this.accion_electrovalvula = this.CERRAR_ELECTROVALVULA;
      this.medicion.valor = Math.floor(Math.random() * 100);
      this.actualizarGrafica(this.medicion.valor);

      intervalObj = setInterval(() => {

          if (this.medicion.valor == 0 || this.logRiegos.apertura == this.ELECTROVALVULA_CERRADA) {
            if (intervalObj) {
              clearInterval(intervalObj); 
              intervalObj = null;
            }
          } else {
              this.medicion.valor--;
              this.actualizarGrafica(this.medicion.valor);
          }
      }, 1000);
  } else {                                    // tomo ultimo valor y lo inserto en la tabla mediciones
      this.logRiegos.fecha = current_datetime;
      this.logRiegos.apertura = this.ELECTROVALVULA_CERRADA;
      this.medicion.fecha = current_datetime;

      this.accion_electrovalvula = this.ABRIR_ELECTROVALVULA;
      console.log('Add Log riego'+ this.logRiegos)
      this._medicionService.addLogRiego(this.logRiegos);
      //this._medicionService.agregarMedicion(this.medicion);
      
  }
}

}

