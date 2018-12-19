import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {SettingsService} from '../_services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(private location: Location,
              public settings: SettingsService,
              public backend: BackendService) {
  }

  back() {
    this.backend.refreshAutoReset();
    this.backend.refreshModules();
    this.backend.refreshRecipes();
    this.location.back();
  }

}
