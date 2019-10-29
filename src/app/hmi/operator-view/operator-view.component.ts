import {Component, OnInit} from '@angular/core';
import ELK from 'elkjs/lib/elk.bundled.js';
import {NGXLogger} from 'ngx-logger';
import {ElkEdge, ElkNode} from '../elkjs';
import {HmiService, MtpHmiJson, MtpHmiObject} from '../hmi.service';
import {BaseSymbolComponent} from '../visualObject/base-symbol/base-symbol.component';
import {HeatExchangerComponent} from '../visualObject/heat-exchanger/heat-exchanger.component';
import {PumpComponent} from '../visualObject/pump/pump.component';
import {TankComponent} from '../visualObject/tank/tank.component';
import {ValveComponent} from '../visualObject/valve/valve.component';

@Component({
    selector: 'app-operator-view',
    templateUrl: './operator-view.component.html',
    styleUrls: ['./operator-view.component.css']
})
export class OperatorViewComponent implements OnInit {

    public outObjects: MtpHmiObject[];
    public outConnections: ElkEdge[];

    private viewBox: string;
    private hmi: MtpHmiJson;

    constructor(
        private hmiService: HmiService,
        private logger: NGXLogger) {
    }

    ngOnInit() {
        this.viewBox = `0 0 600 400`;

        this.hmi = this.hmiService.getHmi('test');

        this.hmi.children = this.prepare(this.hmi.children);
        this.outObjects = this.hmi.children as MtpHmiObject[];
        this.outConnections = this.hmi.edges;
        this.layout();
    }

    public prepare(input: MtpHmiObject[]): MtpHmiObject[] {
        return input.map((object: MtpHmiObject) => {
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
        const elk: ELK = new ELK();

        /* https://rtsys.informatik.uni-kiel.de/elklive/json.html
        *  https://github.com/OpenKieler/elkjs
        *  https://www.eclipse.org/elk/reference.html
        * */
        const graph: ElkNode = {
            id: 'root',
            layoutOptions: {
                'elk.algorithm': 'elk.layered',
                'elk.direction': 'RIGHT',
                'elk.aspectRatio': 2
            },
            ...this.hmi
        };

        const data = await elk.layout(graph);
        this.outObjects = data.children;
        this.outConnections = data.edges;
        this.viewBox = `${data.x} ${data.y} ${data.width} ${data.height}`;

        this.logger.info('layouting finished', data);
    }

}
