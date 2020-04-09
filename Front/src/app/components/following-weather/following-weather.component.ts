import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrevisionService } from '../../services/prevision.service';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'following-weather',
  templateUrl: './following-weather.component.html',
  styleUrls: ['./following-weather.component.scss'],
})
export class FollowingWeatherComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private prevService: PrevisionService,
    private iconService: IconService
  ) {}

  city: string;
  followOne = {
    date: null,
    weather: null,
    iconTemp: null,
    temperature: null,
    humidity: null,
    iconHumidity: null,
  };
  followTwo = {
    date: null,
    weather: null,
    iconTemp: null,
    temperature: null,
    humidity: null,
    iconHumidity: null,
  };
  followThree = {
    date: null,
    weather: null,
    iconTemp: null,
    temperature: null,
    humidity: null,
    iconHumidity: null,
  };
  followFour = {
    date: null,
    weather: null,
    iconTemp: null,
    temperature: null,
    humidity: null,
    iconHumidity: null,
  };

  ngOnInit() {
    this.city = this.route.snapshot.paramMap.get('nameCity');

    this.prevService.getFollowingDays(this.city).subscribe((data) => {
      this.followOne.date = data[1].dateObj;
      this.followOne.weather =
        data[1].weather[0].toUpperCase() + data[1].weather.slice(1);
      this.followOne.iconTemp = `http://openweathermap.org/img/wn/${data[1].icon}@2x.png`;
      this.followOne.temperature = data[1].Temperature.value;
      this.followOne.humidity = data[1].humidity;
      this.followOne.iconHumidity = this.iconService.getIconHumidity(
        data[1].humidity
      );

      this.followTwo.date = data[2].dateObj;
      this.followTwo.weather =
        data[2].weather[0].toUpperCase() + data[2].weather.slice(1);
      this.followTwo.iconTemp = `http://openweathermap.org/img/wn/${data[2].icon}@2x.png`;
      this.followTwo.temperature = data[2].Temperature.value;
      this.followTwo.humidity = data[2].humidity;
      this.followTwo.iconHumidity = this.iconService.getIconHumidity(
        data[2].humidity
      );

      this.followThree.date = data[3].dateObj;
      this.followThree.weather =
        data[3].weather[0].toUpperCase() + data[3].weather.slice(1);
      this.followThree.iconTemp = `http://openweathermap.org/img/wn/${data[3].icon}@2x.png`;
      this.followThree.temperature = data[3].Temperature.value;
      this.followThree.humidity = data[3].humidity;
      this.followThree.iconHumidity = this.iconService.getIconHumidity(
        data[3].humidity
      );

      this.followFour.date = data[4].dateObj;
      this.followFour.weather =
        data[4].weather[0].toUpperCase() + data[4].weather.slice(1);
      this.followFour.iconTemp = `http://openweathermap.org/img/wn/${data[4].icon}@2x.png`;
      this.followFour.temperature = data[4].Temperature.value;
      this.followFour.humidity = data[4].humidity;
      this.followFour.iconHumidity = this.iconService.getIconHumidity(
        data[4].humidity
      );
    });
  }
}
