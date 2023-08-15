import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicion } from 'app/model/Medicion';
import { MedicionService } from 'app/services/medicion.service';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit, OnDestroy {

  public mediciones: Medicion[];
  public dispositivoId: number;

  constructor(private router: ActivatedRoute, private _medicionService: MedicionService) {}
  
  async ngOnInit() {
    this.router.params.subscribe((params) => {
      this.dispositivoId = +params['id'];
      console.log(this.dispositivoId);
    });

    await this._medicionService.getMedicionById(this.dispositivoId)
    .then((mediciones) => {
          console.log(mediciones)
        })
        .catch((error) => {
          console.log('Error:', error)
        })
    
    
  }

  ngOnDestroy(): void {}
  
}
