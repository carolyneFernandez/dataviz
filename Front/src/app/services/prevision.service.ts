import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PrevisionService {
  constructor(private http: HttpClient) {}

  /**
   * Returns table of following days with weather and temperature for the city
   **/
  getFollowingDays(city) {
    return this.http.get(
      `${environment.basicUrl}/api/temperature/forecast/${city}`
    );
  }

  /**
   *Returns table of cities and its temperature
   **/
  getCitiesAndTemperatures() {
    return this.http.get(`${environment.basicUrl}/api/temperature/`);
  }
  /**
   *Returns wind for a city
   **/
  getWindForOneCity(city) {
    return this.http.get(`${environment.basicUrl}/api/wind/forecast/${city}`);
  }
  /**
   *Returns precipitations for thae city
   **/
  getPrecipitationsForOneCity(city) {
    return this.http.get(
      `${environment.basicUrl}/api/precipitation/forecast/${city}`
    );
  }
  /**
   *Returns the list of studied rivers around a city
   **/
  getWatersList(city): Promise<any> {
    return this.http
      .get(`${environment.basicUrl}/api/water/` + city)
      .toPromise();
  }

  /**
   * Return water quality info for a sampling station
   */
  getWaterInfos(city, stationCode): Promise<any> {
    return this.http
      .get(`${environment.basicUrl}/api/water/` + city + "/" + stationCode)
      .toPromise();
  }
  /**
   *
   *Returns temperature for a city
   **/
  getTemperatureForOneCity(city) {
    return this.http.get(`${environment.basicUrl}/api/temperature/${city}`);
  }

  /* Return table of cloud cover cities */
  getCloudCover(city) {
    return this.http.get(`${environment.basicUrl}/api/cloud/forecast/${city}`);
  }

  /* Return table of following data for one city */
  getAllDataDays(city) {
    return this.http.get(`${environment.basicUrl}/api/data/forecast/${city}`);
  }

  /* Return cities */
  getCities() {
    return this.http.get(`${environment.basicUrl}/api/city`);
  }
}
