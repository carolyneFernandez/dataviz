import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const basicUrl = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class PrevisionService {


  constructor(private http:HttpClient) {   }
  /* Return name and temperature for unique city */
  getTemperatureForOneCity(city){
    return this
           .http
           .get(`${basicUrl}/api/temperature/${city}`);
  }

   /* Return table of cities and its temperature */
   getCitiesAndTemperatures() {
    return this.http.get(`${basicUrl}/api/temperature/`);
  }

}
