import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PrevisionService } from "../services/prevision.service";

@Component({
  selector: "current-weather",
  templateUrl: "./current-weather.component.html",
  styleUrls: ["./current-weather.component.scss"],
})
export class CurrentWeatherComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private prevService: PrevisionService
  ) {}

  city: string;
  dateTemp: string;
  date: Date;
  weather: string;
  temperature: number;
  feeling: number;
  tempMin: number;
  tempMax: number;
  windSpeedName: string;
  windSpeed: number;
  windCode: string;
  windDirectionName: string;
  humidity: number;
  pressure: number;
  iconTemp: string;
  iconHumidity: string;
  iconWind: string;
  iconPressure: string;

  ngOnInit() {
    this.city = this.route.snapshot.paramMap.get("idcity");
    this.prevService.getTemperatureForOneCity(this.city).subscribe((data) => {
      this.weather = data[0].weather;
      this.date = data[0].dateObj;
      this.temperature = data[0]["Temperature"].value;
      this.feeling = data[0]["Temperature"].feeling;
      this.tempMin = data[0]["Temperature"].value_min;
      this.tempMax = data[0]["Temperature"].value_max;
      this.iconTemp = `http://openweathermap.org/img/wn/${data[0].icon}@2x.png`;
      this.humidity = data[0].humidity;
      this.pressure = data[0].pression;

      this.prevService.getWindForOneCity(this.city).subscribe((data) => {
        this.windSpeedName = data[0]["Wind"].speed_name;
        this.windSpeed = data[0]["Wind"].speed;
        this.windCode = data[0]["Wind"].direction_code;
        this.windDirectionName = data[0]["Wind"].direction_name;

        this.getIcon();
      });
    });
  }

  getIcon() {
    // Humidity
    if (this.humidity > 75) {
      this.iconHumidity = "../assets/images/drop.svg";
    } else if (this.humidity > 50) {
      this.iconHumidity = "../assets/images/drop.svg";
    } else {
      this.iconHumidity = "../assets/images/transparent_drops.svg";
    }
    //Wind
    switch (this.windSpeedName) {
      case "Gentle Breeze":
        this.iconWind = "../assets/images/wind.svg";
        break;
      case "Moderate breeze":
        this.iconWind = "../assets/images/wind.svg";
        break;
      case "Fresh Breeze":
        this.iconWind = "../assets/images/wind.svg";
        break;
      case "Light breeze":
        this.iconWind = "../assets/images/wind.svg";
        break;
      case "Calm":
        this.iconWind = "../assets/images/wind.svg";
        break;
      default:
        console.log("nope");
        break;
    }
  }
}
