import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  private api:string="http://localhost:3000/api/temperature/";

  searchWeatherInfo(city:String){
    return this.http.get(this.api+city);
  }



}
