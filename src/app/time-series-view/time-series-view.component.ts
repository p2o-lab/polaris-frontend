import { Component, OnInit } from '@angular/core';
import {BackendService} from '../_services/backend.service';

@Component({
  selector: 'app-time-series-view',
  templateUrl: './time-series-view.component.html',
  styleUrls: ['./time-series-view.component.css']
})
export class TimeSeriesViewComponent implements OnInit {

  data = [];

  constructor(public backend: BackendService) { }

  ngOnInit() {
    this.backend.variables.subscribe((data) => {
      this.data = [...data]
    });
  }

}
