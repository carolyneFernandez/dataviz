import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  private urlPersonajes:string="https://swapi.co/api/people/?format=json";

  //CREAMOS UNA FUNCIOM DE PETICION
  peti(){
        //return this.http.get<any>(this.urlPersonajes);
    return this.http.get(this.urlPersonajes);
  }
  searchWeatherInfo(city: string): Observable<any> {
    const APPID = '7a211c68435846ab04153a9d815b09f3';
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + APPID + '&units=metric';

    return this.http.get<any>(url).pipe(map(res => res.json()));
  
}

}
