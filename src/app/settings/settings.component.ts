import {Location} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
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

  @ViewChild('forceDarkmodeCheckbox', {static: true}) forceDarkmodeCheckbox: MatCheckbox;

  private forceDarkmode = false;

  constructor(private location: Location,
              public settings: SettingsService,
              public backend: BackendService,
              public ambientLight: AmbientLightService) {
    this.frontendVersion = version;
  }

  ngOnInit(): void {
    this.backend.refreshAutoReset();
    this.backend.getVersion().subscribe((data: { version: string }) => this.backendVersion = data.version);

    this.ambientLight.darkmode.subscribe((value) => this.setCheckbox(value));
  }

  reload(): void {
    // use window.location reload method in order to load whole page resulting in fresh websocket connection
    location.reload();
  }

  /**
   * toggles the darkmode globally
   */
  toggleDarkmode(e: MatCheckboxChange): void {
    if (this.ambientLight.getAmbientAdaptionEnabled() === true) {
      this.forceDarkmode = !this.forceDarkmode;
      this.ambientLight.setDarkmode(this.forceDarkmode);
    } else {
      // reset the checkbox
      e.source.checked = false;
    }
  }

  /**
   * Switch the ambient light adaption state
   */
  enableAmbientAdaption(e: MatCheckboxChange): void {
    if (e.checked) {
      // activate ambient adaption
      this.ambientLight.enableAmbientLightAdaption(true);
    } else {
      // deactivate ambient adaption due to errors
      this.ambientLight.enableAmbientLightAdaption(false);
    }
  }

  /**
   * Set the checkbox to the right state
   */
  private setCheckbox(state: boolean) {
    this.forceDarkmodeCheckbox.checked = state;
  }

}
