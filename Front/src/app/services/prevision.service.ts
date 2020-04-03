import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrevisionService {
  private baseUrl :string = "https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1";

  constructor(private http:HttpClient) { }
  //metodo para obtener los datos del api en rails
 /* public get_articles(){
    return this.http.get(this.baseUrl.map(reponse => {reponse.json(); console.log(reponse)}));
  }*/
  get_articles(ville){
  //  return this.http.get( this.baseUrl.map(Response =>json())
    //)
  }

  getTemperatureForOneCity(city){
      return this
             .http
             .get(`http://localhost:3000/api/temperature/Lyon`);
  }

  getWindForOneCity(city){
    return this
             .http
             .get(`http://localhost:3000/api/wind/Lyon`);
  }
}
