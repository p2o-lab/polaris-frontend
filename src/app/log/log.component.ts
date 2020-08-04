import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BackendService} from '../_services/backend.service';
import {SettingsService} from '../_services/settings.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  public logs$: Observable<any>;
    public readonly logUrl: string;
    public readonly logVariableUrl: string;
    public readonly logServiceUrl: string;

    constructor(private backend: BackendService,
                private settings: SettingsService) {
        this.logUrl = this.settings.apiUrl + '/logs.json';
        this.logServiceUrl = this.settings.apiUrl + '/logs/services.json';
        this.logVariableUrl = this.settings.apiUrl + '/logs/variables.json';
  }

  public ngOnInit(): void {
    this.logs$ = this.backend.getLogs();
  }

}
