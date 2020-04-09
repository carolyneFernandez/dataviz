import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor() {}

  /* Select icon for humidity depending on humidity value */
  getIconHumidity(humidity) {
    if (humidity > 75) {
      return '../assets/images/Three_drops.svg';
    } else if (humidity >= 50) {
      return '../assets/images/Two_drops.svg';
    } else if (humidity >= 25) {
      return '../assets/images/One_drop.svg';
    } else if (humidity >= 0) {
      return '../assets/images/Transparent_drop.svg';
    } else {
      console.log('ERROR : Fail get icon humidity');
      return '../assets/images/Two_drops.svg';
    }
  }

  /* Select icon for wind depending on wind name */
  getIconWind(windName) {
    switch (windName) {
      case 'Gentle Breeze':
        return '../assets/images/Gentle_Breeze.svg';
      case 'Calm':
        return '../assets/images/Calm.svg';
      case 'Moderate breeze':
        return '../assets/images/Moderate_breeze.svg';
      case 'Fresh Breeze':
        return '../assets/images/Fresh_Breeze.svg';
      case 'Light breeze':
        return '../assets/images/Light_breeze.svg';

      default:
        console.log('ERROR : Fail get icon wind');
        return '../assets/images/Gentle_Breeze.svg';
    }
  }

  /* Select icon for pressure depending on pressure value */
  getIconPressure(pressure) {
    if (pressure < 960) {
      return '../assets/images/pressure_960.svg';
    } else if (pressure <= 980) {
      return '../assets/images/pressure_980.svg';
    } else if (pressure <= 995) {
      return '../assets/images/pressure_995.svg';
    } else if (pressure <= 1010) {
      return '../assets/images/pressure_1010.svg';
    } else if (pressure <= 1025) {
      return '../assets/images/pressure_1025.svg';
    } else if (pressure <= 1040) {
      return '../assets/images/pressure_1040.svg';
    } else if (pressure <= 1060) {
      return '../assets/images/pressure_1060.svg';
    } else {
      console.log('ERROR : Fail get icon pressure');
      return '../assets/images/pressure_1010.svg';
    }
  }
}
