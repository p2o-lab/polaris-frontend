import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {version} from '../../../package.json';
import {AmbientLightService} from '../_services/ambient-light.service';
import {BackendService} from '../_services/backend.service';
import {SettingsService} from '../_services/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    public backendVersion: string;
    public frontendVersion: string;
    private forceDarkmode: boolean = false;

    constructor(private location: Location,
                public settings: SettingsService,
                public backend: BackendService,
                public ambientLight: AmbientLightService) {
        this.frontendVersion = version;
    }

    ngOnInit() {
        this.backend.refreshAutoReset();
        this.backend.getVersion().subscribe((data: {version: string}) => this.backendVersion = data.version);
    }

    reload() {
        // use window.location reload method in order to load whole page resulting in fresh websocket connection
        location.reload();
    }

  /**
   * toggles the darkmode globally
   */
  toggleDarkmode() {
      this.forceDarkmode = !this.forceDarkmode;
      this.ambientLight.setDarkmode(this.forceDarkmode);
    }

}
