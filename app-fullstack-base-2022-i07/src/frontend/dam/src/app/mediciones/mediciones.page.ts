import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicionService } from 'app/services/medicion.service';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit, OnDestroy {

  constructor(private _medicionService: MedicionService) {}
  
  async ngOnInit() {
    await this._medicionService.getMedicion()
    .then((mediciones) => {
          console.log(mediciones)
        })
        .catch((error) => {
          console.log('Error:', error)
        })
    
    // for (let id=1; id<=6; id++){
    //   this._medicionService.getLastMedicion(id).then((medicion) => {
    //     console.log(medicion)
    //   })
    //   .catch((error) => {
    //     console.log('Error:', error)
    //   })
    //   }
    
  }

  ngOnDestroy(): void {}
  
}
