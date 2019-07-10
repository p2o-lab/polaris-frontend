import { HttpXsrfTokenExtractor } from '@angular/common/http';
import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { OpcuaService } from 'src/app/services/opcua.service';
@Component({
    selector: 'app-kpi',
    templateUrl: './kpi.component.html',
    styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @ViewChild('kpiCanvas') kpiCanvas: ElementRef;
    chart: Chart;

    protected currentSelection;
    protected selModules;
    protected currentLevel;


    // minimal allowed hue difference of border colors
    // choose between 0 and 360
    // the bigger the more contrast and less colors are possible
    // the less the less contrast and more colors are possible

    protected minimalColorDifference: number = 20;

    // choose global lightness and saturation of colors between 0 and 1

    protected lightnessOfBorderColors: number = 0.5;
    protected saturationOfBorderColors: number = 0.8;

    randomBorderColors = [];

    subscriptions;


    constructor(private store$: Store<State>, private opcuaService: OpcuaService) {
        let subplant;
        // subscribing to currentSelection
        this.subscriptions = this.store$.pipe(select(selectCurrentSelectionIDs)).subscribe(
            (selection) => {
                this.currentSelection = selection;
                this.selModules = this.currentSelection.selModules;
                // check for new subplant selection
                this.store$.pipe(select(selectSubplantSelection)).subscribe(
                    (_subplant) => {
                        if ((_subplant !== subplant)
                            || ( _subplant != null  && this.selModules.length === 0)
                            || (_subplant != null && this.currentLevel === 1)) {
                            subplant = _subplant;
                            this.updateChart(_subplant, true);
                        }
                    });
               // check for new module selection
                if (this.selModules.length !== 0 && this.currentLevel !== 1) {
                    this.store$.pipe(select(selectModulesWithID(this.selModules))).subscribe(
                        (_modules) => {
                            this.updateChart(_modules, false);
                    });
                }
            }
        );
        this.subscriptions.add(this.store$.pipe(select(selectCurrentLevel)).subscribe(
            (level: number) => {
                this.currentLevel = level;
            }));

    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
    }

    ngAfterViewInit() {
        this.setupGraph(this.kpiCanvas);
    }

     /**
      * setup Chart with default options
      * @param canvas
      */
    setupGraph(canvas: ElementRef): void {
        this.chart = new Chart(canvas.nativeElement, {
            type: 'line',
            data: {
                labels: ['9:00', '10:00', '11:00', '12:00', '13:00'],
                datasets: []
            },
            options: {
                legend: {
                    display: false,
                    position: 'bottom'
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }],
                },
                maintainAspectRatio: false
            }
        });
    }
    /**
     * update Chart, called when user inputs new selection
     * @param module - new selected Node
     * @param isSubplant - Boolean about the nodes root
     */
    updateChart(module: any, isSubplant: boolean) {
        if (isSubplant) {
            let modules;
             // @ts-ignore
            this.chart.options.legend.display = true;
            this.subscriptions.add(this.store$.pipe(select(selectAllModulesOfSubplant(module.id))).subscribe(
                (_modules) => {
                    modules = _modules;
                }));
            this.updateModules(modules);
        } else {
            this.updateModules(module);
        }
        this.chart.update();
    }
    /**
     * get kpi from ngrx state
     * @param module - selected module
     */
    getKpi(module) {
        let kpi;
        this.subscriptions.add(this.store$.pipe(select(selectKpiFromModule(module.id))).subscribe(
            (_kpi) => {
                kpi = _kpi;
            }));
            return kpi;
    }
    /**
     * central function for updating the chart
     * checks for permanent and new coming data for the update
     * creates the datasets and sets these to the chart
     * @param module - selected module
     */
    updateModules(module) {
        let dataset = {};
        const newDatasets = [];

        const checkedData = this.checkForPermanentDatasets(module, this.chart.data.datasets);
        const permanentDatasets = checkedData.permanentData;
        module = checkedData.node;

        this.chart.data.datasets = [];

        // checks if there are enough colors for every module,
        // if not => default black to avoid while loop running forever

        let thereAreEnoughColorsForAllModules = true;
        if (module.length > 360 / this.minimalColorDifference) {
            thereAreEnoughColorsForAllModules = false;
        }

        module.forEach((element) => {
            const kpi = this.getKpi(element);

            if (thereAreEnoughColorsForAllModules) {
                dataset = this.createNewDataset(kpi[0], element.id, this.generateRandomColor());
            } else {
                dataset = this.createNewDataset(kpi[0], element.id, '#000000');
            }

            this.chart.data.datasets.push(dataset);
            newDatasets.push(dataset);
        });
        permanentDatasets.forEach(dataset => this.chart.data.datasets.push(dataset));
    }
    /**
     * creates new dataset based on module
     * @param module - selected module
     */
    createNewDataset(module: any, label: string, borderColor) {
       const dataset = {
            label: label,
            data: module,
            borderColor: borderColor || '#000000',
            fill: false
        };
        return dataset;
    }
    /**
     * checks for datasets, which do not have to get updated
     * @param modules - selected module
     * @param oldDatasets - previews datasets in chart
     */
    checkForPermanentDatasets(modules, oldDatasets) {
        const permanentDatasets = [];
        const permanentColors = [];

        oldDatasets.forEach((dataset) => {
            modules.map((_node) => {
                if (dataset.label === _node.id) {
                    permanentDatasets.push(dataset);
                    permanentColors.push(dataset.borderColor);
                    modules.splice(modules.indexOf(_node), 1);
                }
            });
        });
        this.randomBorderColors = this.randomBorderColors.filter((color) => permanentColors.includes(color.hex));
        return {permanentData: permanentDatasets, node: modules};
    }

    /**
     * generates random colors based on HSL and saves colors in randomBorderColor
     */
    generateRandomColor() {
        let tooCloseToExistingColor = true;
        let hue;
        let colorDistanceIsToShort;

        while (tooCloseToExistingColor) {
            hue  = Math.floor(Math.random() * 360);

            colorDistanceIsToShort = this.randomBorderColors.map((color) => {
                if (Math.abs(Math.abs(color.hue) - Math.abs(hue)) < this.minimalColorDifference) {
                    return true;
                } else { return false; }
            });

            if (!colorDistanceIsToShort.includes(true)) {
                tooCloseToExistingColor = false;
            }
        }

        const hex = this.convertHslToHex(hue);

        this.randomBorderColors.push({
            hue: hue,
            hex: hex
        });
        return hex;
    }

    convertHslToHex(hue) {
        const rgb = this.hslToRgb(hue);
        return this.rgbToHex(rgb[0], rgb[1], rgb[2]);
    }
    /**
     * converts Hsl to Rgb
     */
    hslToRgb(hue) {
        let r;
        let g;
        let b;
        const s = this.saturationOfBorderColors;
        const l = this.lightnessOfBorderColors;
        hue = hue / 360;

        const hueToRgb = function hueToRgb(p, q, t) {
            if (t < 0) { t += 1; }
            if (t > 1) { t -= 1; }
            if (t < 1 / 6) { return p + (q - p) * 6 * t; }
            if (t < 1 / 2) { return q; }
            if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, hue + 1 / 3);
        g = hueToRgb(p, q, hue);
        b = hueToRgb(p, q, hue - 1 / 3);


        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
    /**
     * converts RGB-Component to Hex
     */
    componentToHex(c) {
        const hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    }
    /**
     * converts RGB to Hex
     */
    rgbToHex(r, g, b) {
        return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
