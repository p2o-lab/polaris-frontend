import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {OverlayContainer} from '@angular/cdk/overlay';
import {Component, HostBinding, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AmbientLightService} from './_services/ambient-light.service';
import {BackendService} from './_services/backend.service';
// tslint:disable-next-line:max-line-length
import {OrientationReferralSnackbarComponent} from './orientation-referral-snackbar/orientation-referral-snackbar.component';

const THEME_DARKNESS_SUFFIX = `-dark`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches)
    );

  @HostBinding('class') activeThemeCssClass: string;
  activeTheme: string;
  darkmode: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver,
              public backend: BackendService,
              private ambientLight: AmbientLightService,
              private overlayContainer: OverlayContainer,
              private snackBar: MatSnackBar) {
    this.setActiveTheme('indigo-purple', /* darkness: */ this.darkmode);
  }

  ngOnInit(): void {
    // subscripe to the darkmode observer of the ambient light service
    this.ambientLight.darkmode.subscribe((darkmode) => {
      switch (darkmode) {
        // set theme accordingly to the darkmode parameter
        case true:
          this.setActiveTheme('deeppurple-amber', darkmode);
          break;
        case false:
          this.setActiveTheme('indigo-purple', darkmode);
          break;
      }
    });

    // listen for orientation changes of the device
    window.addEventListener('orientationchange', () => {
      this.snackBar.openFromComponent(OrientationReferralSnackbarComponent, {
        data: {
          message: 'The content display in your current orientation is not optimal. ' +
            'Please consider switching the orientation.',
            icon: 'screen_rotation'
        }
      });
    });
  }

  /**
   * Sets the color theme for the complete app
   * @param theme namestring of the theme to set
   * @param darkness boolean if darkmode should be enabled
   */
  setActiveTheme(theme: string, darkness: boolean = null) {
    if (darkness === null) {
      darkness = this.darkmode;
    } else if (this.darkmode === darkness) {
      if (this.activeTheme === theme) {
        return;
      }
    } else {
      this.darkmode = darkness;
    }
    this.activeTheme = theme;

    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme;

    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass)) {
      classList.replace(this.activeThemeCssClass, cssClass);
    } else {
      classList.add(cssClass);
    }
    this.activeThemeCssClass = cssClass;
  }
}
