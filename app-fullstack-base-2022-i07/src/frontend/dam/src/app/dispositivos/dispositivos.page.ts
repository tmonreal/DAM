import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, fromEvent, interval, map } from 'rxjs';
import { DispositivoService } from '../services/dispositivo.service'
import { Dispositivo } from 'app/model/Dispositivo';
import { Medicion } from 'app/model/Medicion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})

export class DispositivosPage implements OnInit, OnDestroy {
  public dispositivo = new Dispositivo(0, " ", " ", 0);
  public medicion = new Medicion(0, ' ', 0, 0);
  public dispositivoId: number;

  observable$: Observable<any>
  subscription: Subscription

  constructor(private router: ActivatedRoute, private _dispositivoService: DispositivoService) {
    this.observable$ = interval(1000)

    const move_values = this.observable$.pipe(map(val => val+10))

    this.subscription = move_values.subscribe((value) => {
      console.log(value)
    })
  }

  //mouseMove = fromEvent(document, 'mousemove')

  //subscription_mouse = this.mouseMove.subscribe((evt: any) => {
  //  console.log(`Coords: ${evt.clientX} X ${evt.clientY}`)
  //})


  async ngOnInit() {
    
    this.router.params.subscribe((params) => {
      this.dispositivoId = +params['id'];
      console.log(this.dispositivoId);
    });

    this.subscription.unsubscribe()

    await this._dispositivoService.getListadoDispositivos()
      .then((dispositivos) => {
        for (let dispositivo of dispositivos){
          console.log(dispositivo.nombre)
        }
        console.log(dispositivos)
      })
      .catch((error) => {
        console.log('Error:', error)
      })
    // Tarda mucho mas en resolverse la consulta a la API que hacer un console log
    // Si uso async - await esperamos a que termine de ejecutar la promesa
    console.log('Me ejecuto primero')
  }

  subscribe () {
    this.subscription = this.observable$.subscribe((integer) => {
      console.log(integer)
    })
  }

  unsubscribe () {
    this.subscription.unsubscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    //this.subscription_mouse.unsubscribe()
  }
}
