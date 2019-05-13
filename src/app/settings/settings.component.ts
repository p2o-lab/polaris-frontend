import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {SettingsService} from '../_services/settings.service';

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
    this.backend.refreshAutoReset();
  }

  back() {
    this.location.back();
  }

  shutdown() {
    this.backend.shutdown().subscribe(() => console.log('shutdown sent'));
  }

}
