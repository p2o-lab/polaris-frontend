import {Component, OnInit} from '@angular/core';
import ELK from 'elkjs/lib/elk.bundled.js';
import {NGXLogger} from 'ngx-logger';
import {ElkJsonInterface, HmiService} from '../hmi.service';
import {BaseSymbolComponent} from '../visualObject/base-symbol/base-symbol.component';
import {HeatExchangerComponent} from '../visualObject/heat-exchanger/heat-exchanger.component';
import {PumpComponent} from '../visualObject/pump/pump.component';
import {ValveComponent} from '../visualObject/valve/valve.component';
import {TankComponent} from '../visualObject/tank/tank.component';
import {AbstractSymbolComponent} from '../visualObject/abstract-symbol.component';

export interface ObjectInterface {
    id: string;
    type: string;
    name?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotation?: number;
    properties?: object;
    ports?: object[];
}
export interface EdgeInterface {
    id: string;
    sources: string[];
    targets: string[];
}

@Component({
    selector: 'app-operator-view',
    templateUrl: './operator-view.component.html',
    styleUrls: ['./operator-view.component.css']
})
export class OperatorViewComponent implements OnInit {

    public outObjects: ObjectInterface[];
    public outConnections: EdgeInterface[];

    private viewBox: string;
    private hmi: ElkJsonInterface;

    constructor(
        private hmiService: HmiService,
        private logger: NGXLogger) {
    }

    ngOnInit() {
        this.viewBox = `0 0 600 400`;

        this.hmi = this.hmiService.getHmi('test');

        this.hmi.children = this.prepare(this.hmi.children);
        this.layout();
    }

    public prepare(input): ObjectInterface[] {
        return input.map((object: ObjectInterface) => {
            switch (object.type) {
                case 'pump':
                    return PumpComponent.getSymbolInformation(object);
                case 'valve':
                    return ValveComponent.getSymbolInformation(object);
                case 'heatexchanger':
                    return HeatExchangerComponent.getSymbolInformation(object);
                case 'tank':
                    return TankComponent.getSymbolInformation(object);
                default:
                    return BaseSymbolComponent.getSymbolInformation(object);
            }
        });
    }

    public async layout() {
        this.logger.info('start layouting', this.hmi);
        const elk: ELK = new ELK();

        const graph = {
            id: 'root',
            layoutOptions: {'elk.algorithm': 'layered'},
            ...this.hmi
        };

        console.log(this.hmi)
        const data = await elk.layout(graph);
        this.outObjects = data.children;
        this.outConnections = data.edges;

        this.logger.info('layouting finished', data.edges[0]);
    }

}
