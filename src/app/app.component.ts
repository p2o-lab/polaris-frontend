import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {OverlayContainer} from '@angular/cdk/overlay';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AmbientLightService} from './_services/ambient-light.service';
import {BackendService} from './_services/backend.service';

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
              private overlayContainer: OverlayContainer) {
    this.setActiveTheme('indigo-purple', /* darkness: */ this.darkmode);
  }

  ngOnInit(): void {
    this.ambientLight.darkmode.subscribe((darkmode) => {
      switch (darkmode) {
        case true:
          this.setActiveTheme('deeppurple-amber', darkmode);
          break;
        case false:
          this.setActiveTheme('indigo-purple', darkmode);
          break;
      }
    });
  }

  /**
   * Sets the color theme for the complete app
   * @param theme
   * @param darkness
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
