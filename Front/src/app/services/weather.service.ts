import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  private urlPersonajes:string=
  "https://swapi.co/api/people/?format=json";
private url:string=
"http://localhost:3000/api/temperature/Paris";
  //CREAMOS UNA FUNCIOM DE PETICION
  peti(){
        //return this.http.get<any>(this.urlPersonajes);city: string
    return this.http.get(this.url);
  }
  searchWeatherInfo(): Observable<any> {
    //const APPID = '7a211c68435846ab04153a9d815b09f3';
    //let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + APPID + '&units=metric';
    return this.http.get<any>(this.url).pipe(map(res => res.json()));

}  

}
