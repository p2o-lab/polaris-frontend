import {Component, OnInit} from '@angular/core';
import {BackendService, ModuleVariableInterface} from '../_services/backend.service';
import {Chart} from 'angular-highcharts';
import {first} from 'rxjs/internal/operators';

@Component({
    selector: 'app-time-series-view',
    templateUrl: './time-series-view.component.html',
    styleUrls: ['./time-series-view.component.css']
})
export class TimeSeriesViewComponent implements OnInit {

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
        series: []
    };
    private highChart = undefined;

    constructor(public backend: BackendService) {
    }

    ngOnInit() {
        // only for initial data
        this.backend.series.pipe(first()).subscribe((data) => {
            this.chartOptions.series = data;
        });

        this.chart = new Chart(<any>this.chartOptions);

        this.chart.ref$.subscribe((chart) => this.highChart = chart);

        this.backend.updatedVariable.subscribe((data) => {
            if (data  && this.highChart && this.highChart.series) {
            const seriesName = `${data.module}.${data.variable}`;
                let index = this.highChart.series.findIndex(s => s.name === seriesName);

                if (index != -1) {
                    const firstTimestamp = this.highChart.series[index].data[0].x;
                    this.chart.addPoint([data.timestamp.getTime(), data.value], index,
                        true, data.timestamp.getTime() - firstTimestamp > 1000 * 60 * 5);
                } else {
                    this.chart.addSeries({
                        name: seriesName,
                        type: 'line',
                        tooltip: {
                            valueDecimals: 3,
                            valueSuffix: ` ${data.unit}`
                        },
                        data: [[data.timestamp.getTime(), data.value]]
                    }, true, true);
                }
            }
        });
    }

}
