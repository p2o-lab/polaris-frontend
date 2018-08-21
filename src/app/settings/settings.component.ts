import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {SettingsService} from '../_services/settings.service';
import {BackendService} from '../_services/backend.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private location: Location,
              public settings: SettingsService,
              public backend: BackendService) {
  }

  ngOnInit() {
  }

  back() {
    this.backend.refreshAutoReset();
    this.backend.refreshModules();
    this.backend.refreshRecipe();
    this.location.back();
  }

}
