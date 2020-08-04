import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {OverlayContainer} from '@angular/cdk/overlay';
import {Component, HostBinding, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AmbientLightService} from './_services/ambient-light.service';
import {BackendService} from './_services/backend.service';
import {SettingsService} from './_services/settings.service';
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
  handset: boolean = false;
  currentPath: string = 'modules';
  currentOrientation: ScreenOrientation;

  constructor(private breakpointObserver: BreakpointObserver,
              public backend: BackendService,
              private ambientLight: AmbientLightService,
              private settings: SettingsService,
              private overlayContainer: OverlayContainer,
              private snackBar: MatSnackBar) {
    // set color theme
    this.setActiveTheme('indigo-purple', /* darkness: */ this.darkmode);

    // set the screen orientation to access it in html
    this.currentOrientation = window.screen.orientation;

    this.isHandset$.subscribe((next) => {
      this.handset = next;
    });
  }

  ngOnInit(): void {
    // subscribe to the darkmode observer of the ambient light service
    this.ambientLight.darkMode.subscribe((darkmode) => {
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
      this.currentOrientation = window.screen.orientation;
      this.checkOrientation(this.currentPath, window.screen.orientation);
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

  /**
   * checks the given component for it's screen orientation needs
   *
   * @param component route name of the component
   * @param currentOrientation orientation of the device when called
   */
  checkOrientation(component: string, currentOrientation: ScreenOrientation) {
    // check if the device is a handset, otherwise exit
    if (this.handset && this.settings.orientationAssistance) {
      // save current path
      this.currentPath =  component;

      // determine which orientation the content currently needs
      switch (component) {
        case 'playlist': {
          if (currentOrientation.type.includes('landscape')) {
            this.notifyOrientationReferral(false);
          }
          break;
        }
        case 'recipes': {
          if (currentOrientation.type.includes('landscape')) {
            this.notifyOrientationReferral(false);
          }
          break;
        }
        case 'modules': {
          if (currentOrientation.type.includes('portrait')) {
            this.notifyOrientationReferral(true);
          }
          break;
        }
        case 'trendview': {
          if (currentOrientation.type.includes('portrait')) {
            this.notifyOrientationReferral(true);
          }
          break;
        }
        case 'logs': {
          if (currentOrientation.type.includes('landscape')) {
            this.notifyOrientationReferral(false);
          }
          break;
        }
        case 'default': {
          // do nothing
        }
      }
    }
  }

  /**
   * notifies the user, if an orientation change is useful
   *
   * @param horizontal true, if horizontal orientation is needed, false for vertical
   */
  notifyOrientationReferral(horizontal: boolean) {
    let displayedReferral: string;
    if (horizontal) {
      displayedReferral = 'The currently displayed content does not fit optimal at your screen orientation.' +
        ' Please rotate device into horizontal orientation.';
    } else {
      displayedReferral = 'The currently displayed content does not fit optimal at your screen orientation.' +
        ' Please rotate device into vertical orientation.';
    }

    this.snackBar.openFromComponent(OrientationReferralSnackbarComponent, {
      data: {
        message: displayedReferral,
        icon: 'screen_rotation'
      },
      duration: 5000
    });
  }
}
