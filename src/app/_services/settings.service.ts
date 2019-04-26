import {Injectable} from '@angular/core';
import {LocalStorage} from 'ngx-store';

@Injectable()
export class SettingsService {

  @LocalStorage() public apiUrl: string;
  @LocalStorage() public mtpConverterUrl: string;

  constructor() {
    this.apiUrl = this.apiUrl || window.location.protocol + '//' + window.location.hostname + ':3000/api';
    this.mtpConverterUrl = this.mtpConverterUrl || window.location.protocol + '//' + window.location.hostname + ':3031';
  }

}
