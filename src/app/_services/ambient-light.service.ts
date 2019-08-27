import {HttpClient} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {RecipeInterface} from '@p2olab/polaris-interface';
import * as moment from 'moment';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AmbientLightService {
  private location: Position;
  private sunrise: Date;
  private sunset: Date;
  private darkmode: boolean;

  constructor(private http: HttpClient,
              private settings: SettingsService) {
    // get geolocation of current device
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            this.location = position;
            this.getSunsetSunrise(position.coords);
          }
        },
        (error: PositionError) => console.log(error));
    } else {
      alert('Geolocation is not supported by your browser.');
    }

    // set timer for calcDarkmode, to periodically get checked if the Darkmode is necessary, if darkmode is being
    // subscribed on
    // timer(0, 60000)
    //   .subscribe(() => {
    //     this.calcDarkmode();
    //   });
  }

  public getDarkmode(): boolean {
    return this.darkmode;
  }

  /**
   * Currently calculates, if the Darkmode has to be applied based on the current time. In the future, other custom
   * options or preferences are possible.
   */
  public calcDarkmode() {
    const now = new Date();

    // compare current time with sunrise/ sunset time
    if ((now < this.sunrise) || (now > this.sunset)) {
      this.darkmode = true;
    } else {
      this.darkmode = false;
    }
  }

  private getSunsetSunrise(coords: Coordinates) {
    this.http.get('https://api.sunrise-sunset.org/json?lat=' + coords.latitude + '&lng=' + coords.longitude +
      '&date=today').subscribe((json: any) => {
      this.sunrise = new Date(moment(json.results.sunrise, 'LTS').format());
      this.sunset = new Date(moment(json.results.sunset, 'LTS').format());

      // correct for timezone Berlin
      moment(this.sunrise).add(1, 'h');
      moment(this.sunset).add(1, 'h');

      // correct for daylight saving time
      if (moment(this.sunrise).isDST()) {
        moment(this.sunrise).add(1, 'h');
      }
      if (moment(this.sunset).isDST()) {
        moment(this.sunset).add(1, 'h');
      }

      this.calcDarkmode();
    });
  }

}
