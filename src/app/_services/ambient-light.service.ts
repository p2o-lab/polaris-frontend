import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RecipeInterface} from '@p2olab/polaris-interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AmbientLightService {
  private lat: string;
  private lng: string;

  constructor(private http: HttpClient,
              private settings: SettingsService) {
    this.getPosition();
    this.getSunsetSunrise();
  }

  private getPosition() {
    this.settings.location;
  }

  private getSunsetSunrise() {
    this.http.get('https://api.sunrise-sunset.org/json?lat=' + '36.7201600' + '&lng=' + '-4.4203400' +
      '&date=today').subscribe((json) => {
      console.log(json);
    });
  }

}
