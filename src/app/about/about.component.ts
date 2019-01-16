import {Component} from '@angular/core';
import {SettingsService} from '../_services/settings.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  apiDocUrl = this.settings.apiUrl + '/../doc';

  constructor(private settings: SettingsService){

  }


}
