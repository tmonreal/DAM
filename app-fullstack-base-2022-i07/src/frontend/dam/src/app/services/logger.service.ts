import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
  })
  export class LoggerService {

    constructor() {}

    logwarning(message: any){
        console.warn(message)
    }

    logError(message: any){
        console.error(message)
    }

    log(message: any){
        console.log(message)
    }
  }