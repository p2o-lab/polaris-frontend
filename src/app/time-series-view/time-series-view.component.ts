import { Component, OnInit } from '@angular/core';
import {BackendService, ModuleVariableInterface, SeriesInterface} from '../_services/backend.service';
import {Chart} from 'angular-highcharts';

@Component({
  selector: 'app-time-series-view',
  templateUrl: './time-series-view.component.html',
  styleUrls: ['./time-series-view.component.css']
})
export class TimeSeriesViewComponent implements OnInit {

  data = [];

    chart: Chart;
    chartOptions = {
        chart: {
            type: 'line'
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        credits: {
            enabled: false
        },
        series: [
        ]
    };
    private highChart = undefined;

  constructor(public backend: BackendService) { }

  ngOnInit() {
    this.backend.variables.subscribe((data) => {
      this.data = [...data];
    });

    this.chartOptions.series = this.backend.series;

    this.chart = new Chart(<any>this.chartOptions);

    this.chart.ref$.subscribe((chart) => this.highChart = chart);

    this.backend.updatedVariable.subscribe((data) => {
        if (data ) {
      const seriesName = `${data.module}.${data.variable}`;
      if (this.highChart && this.highChart.series) {
          let index = this.highChart.series.findIndex(s => s.name === seriesName);

          if (index != -1) {
              const firstTimestamp = this.highChart.series[index].data[0].x;
              this.chart.addPoint([data.timestamp.getTime(), data.value], index,
                  true, data.timestamp.getTime() - firstTimestamp > 1000 * 60 * 5);
          } else {
              this.chart.addSeries({
                  name: seriesName,
                  type: 'line',
                  data: [[data.timestamp.getTime(), data.value]]
              }, true, true);
          }
      }
    }
  });
  }

}
