import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {SettingsService} from '../_services/settings.service';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private location: Location,
              public settings: SettingsService,
              private backend: BackendService) {
  }

  ngOnInit() {
  }

  back() {
    this.backend.refreshModules();
    this.backend.refreshRecipe();
    this.location.back();
  }

}
