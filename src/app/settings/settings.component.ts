import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {SettingsService} from '../_services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private location: Location,
              public settings: SettingsService) {
  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

}
