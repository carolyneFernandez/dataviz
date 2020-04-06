import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class IconService {
  constructor() {}

  //TODO make icon
  getIconHumidity(humidity) {
    if (humidity > 75) {
      return "../assets/images/drop.svg";
    } else if (humidity >= 50) {
      return "../assets/images/drop.svg";
    } else {
      return "../assets/images/transparent_drops.svg";
    }
  }

  //TODO make icon
  getIconWind(windName) {
    switch (windName) {
      case "Gentle Breeze":
        return "../assets/images/wind.svg";
      case "Moderate breeze":
        return "../assets/images/wind.svg";
      case "Fresh Breeze":
        return "../assets/images/wind.svg";
      case "Light breeze":
        return "../assets/images/wind.svg";
      case "Calm":
        return "../assets/images/wind.svg";
      default:
        console.log("ERROR : Fail get icon wind");
        break;
    }
  }
}
