import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogRiegos } from 'app/model/LogRiegos';
import { MedicionService } from 'app/services/medicion.service';

@Component({
  selector: 'app-log-riegos',
  templateUrl: './log-riegos.page.html',
  styleUrls: ['./log-riegos.page.scss'],
})
export class LogRiegosPage implements OnInit {

  public electrovalvulaId: number;
  public logRiegos: LogRiegos[];

  constructor(
    private router: ActivatedRoute,
    private _medicionService: MedicionService
  ) { }

  async ngOnInit() {

    this.router.params.subscribe((params) => {
      this.electrovalvulaId = +params['id'];
      //console.log(this.dispositivoId);
    });

    await this._medicionService.getLogByElectrovalvulaId(this.electrovalvulaId)
    .then(log => {
      this.logRiegos = log;
      console.log('LogRiegos:', this.logRiegos);
    }).catch((error)=>{
      console.log('Error: ', error)
    })


  }

}
