import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {SettingsService} from '../_services/settings.service';
import {version} from '../../../package.json';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    private backendVersion: Object;
    private frontendVersion;

    constructor(private location: Location,
                public settings: SettingsService,
                public backend: BackendService) {
        this.frontendVersion = version;
    }

    ngOnInit() {
        this.backend.refreshAutoReset();
        this.backend.getVersion().subscribe(data => this.backendVersion = data['version']);
    }

    back() {
        this.location.back();
    }

    shutdown() {
        this.backend.shutdown().subscribe(() => console.log('shutdown sent'));
    }

}
