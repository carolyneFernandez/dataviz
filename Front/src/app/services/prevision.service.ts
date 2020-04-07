import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const basicUrl = 'http://localhost:3000';

@Injectable({
  providedIn: "root",
})
export class PrevisionService {
  constructor(private http: HttpClient) {}

  /* Return table of following days with weather and temperature for one city */
  getFollowingDays(city) {
    return this.http.get(`${basicUrl}/api/temperature/forecast/${city}`);
  }
  /* Return table of cities and its temperature */
  getCitiesAndTemperatures() {
    return this.http.get(`${basicUrl}/api/temperature/`);
  }

  /* Return wind for one city */
  getWindForOneCity(city) {
    return this.http.get(`${basicUrl}/api/wind/${city}`);
  }
  //metodo para obtener los datos del api en rails
 /* public get_articles(){
    return this.http.get(this.baseUrl.map(reponse => {reponse.json(); console.log(reponse)}));
  }*/
  get_articles(ville){
  //  return this.http.get( this.baseUrl.map(Response =>json())
    //)
  }

  /**
   * Récupère  la liste des cours d'eau étudié pour une ville.
   */
  getWatersList(city): Promise<any> {
    return this.http.get('http://localhost:3000/api/waters/'+city).toPromise();
  }

  /**
   * Récupère  les infos de la qualité de l'eau pour une station de prélèvement
   */
  getWaterInfos(city, stationCode): Promise<any> {
    return this.http.get('http://localhost:3000/api/waters/'+city+'/'+stationCode).toPromise();
  }

  getTemperatureForOneCity(city){
      return this
             .http
             .get(`http://localhost:3000/api/temperature/Lyon`);
  }
}