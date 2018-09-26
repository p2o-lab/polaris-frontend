import {Component, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {Observable} from 'rxjs';
import {SettingsService} from '../_services/settings.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  public logs$: Observable<Object>;
    public readonly logUrl: string;

    constructor(private backend: BackendService,
                private settings: SettingsService) {
        this.logUrl = this.settings.apiUrl + '/logs';
  }

  ngOnInit() {
    this.logs$ = this.backend.getLogs();
  }

}
