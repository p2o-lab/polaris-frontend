import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AmbientLightService} from './_services/ambient-light.service';
import {BackendService} from './_services/backend.service';

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
  darkmode: boolean = false;
  constructor(private breakpointObserver: BreakpointObserver,
              public backend: BackendService, private ambientLight: AmbientLightService) {
  }

  ngOnInit(): void {
    this.darkmode = this.ambientLight.getDarkmode();
  }
}
