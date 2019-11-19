import {Injectable} from '@angular/core';
import {LocalStorage} from 'ngx-store';

@Injectable()
export class SettingsService {

  @LocalStorage() public apiUrl: string = window.location.protocol + '//' + window.location.hostname + ':3000/api';
  @LocalStorage() public mtpConverterUrl: string = window.location.protocol + '//' + window.location.hostname + ':3031';
  @LocalStorage() public orientationAssistance: boolean = true;
  @LocalStorage() public enableServiceLauncher: boolean = true;

}
