import {Component, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  public logs$: Observable<Object>;

  constructor(private backend: BackendService) {
  }

  ngOnInit() {
    this.logs$ = this.backend.getLogs();
  }

}
