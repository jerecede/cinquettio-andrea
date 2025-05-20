import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getLocation(): Promise<any>{

    const promise = new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (location) => resolve(location),
          (error) => reject(error.message) // errore -permesso negato
        )
      } else {
        reject("non c'è la location") //errore -dispositivo non supporta geolocation
      }

    });

    return promise;
  }
}
