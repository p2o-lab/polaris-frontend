import {Injectable} from '@angular/core';
import {LocalStorage} from 'ngx-store';

@Injectable()
export class SettingsService {


  @LocalStorage() public apiUrl: string;

  constructor() {
    this.apiUrl = this.apiUrl || 'http://localhost:3000';
  }


}
