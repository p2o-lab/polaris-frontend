import {Component, OnInit} from '@angular/core';
import ELK from 'elkjs/lib/elk.bundled.js';
import {BaseSymbolComponent} from '../visualObject/base-symbol/base-symbol.component';
import {PumpComponent} from '../visualObject/pump/pump.component';

@Component({
    selector: 'app-operator-view',
    templateUrl: './operator-view.component.html',
    styleUrls: ['./operator-view.component.css']
})
export class OperatorViewComponent implements OnInit {

    public visualObjects = [
        PumpComponent.getSymbolInformation('P001', 90),
        PumpComponent.getSymbolInformation('P002', 45),
        {
            id: 'V001',
            type: 'valve',
            rotation: 0,
            width: 30, height: 30,
            x: 20, y: 20,
            ports: [
                { id: 'V001.In', x: 0, y: 15 },
                { id: 'V001.Out', x: 30,  y: 15 }
            ],
            properties: {
                portConstraints: 'FIXED_POS'

            }
        },
        {
            id: 'V002a',
            type: 'valve',
            rotation: 90,
            x: 20, y: 50,
            width: 30, height: 30,
            ports: [
                { id: 'V002.In', x: 0, y: 15 },
                { id: 'V002.Out', x: 30,  y: 15 }
            ],
            properties: {
                portConstraints: 'FIXED_POS'

            }
        },
        {
            id: 'V003',
            type: 'valve',
            rotation: 0,
            width: 30, height: 30,
            ports: [
                { id: 'V003.In', x: 0, y: 15 },
                { id: 'V003.Out', x: 30,  y: 15 }
            ],
            properties: {
                portConstraints: 'FIXED_POS'

            }
        },
        {
            id: 'base001',
            type: 'base',
            rotation: 0,
            width: BaseSymbolComponent.width, height: BaseSymbolComponent.height,
            ports: [
                { id: 'V004.In', x: 0, y: 15 },
                { id: 'V004.Out', x: 30,  y: 15 }
            ],
            properties: {
                portConstraints: 'FIXED_POS'

            }
        },
        {
            id: 'W001',
            type: 'heatexchanger',
            rotation: 0,
            width: BaseSymbolComponent.width, height: BaseSymbolComponent.height,
            ports: [
                { id: 'W001.HIn', x: 0, y: 15 },
                { id: 'W001.HOut', x: 30,  y: 15 },
                { id: 'W001.CIn', x: 15, y: 5 },
                { id: 'W001.COut', x: 15,  y: 25 }
            ],
            properties: {
                portConstraints: 'FIXED_POS'

            }
        }
    ];
    public connections = [
        {id: 'e1', sources: ['W001.HOut'], targets: ['V003.In']},
        {id: 'e3', sources: ['P001.Out'], targets: ['V002.In']},
        {id: 'e7', sources: ['P001.Out'], targets: ['V004.In']},
        {id: 'e4', sources: ['V002.Out'], targets: ['P002.In']},
        {id: 'e5', sources: ['P002.Out'], targets: ['V003.In']},
        {id: 'e6', sources: ['V003.Out'], targets: ['P001.In']},
        {id: 'e7', sources: ['V004.Out'], targets: ['W001.CIn']},
        {id: 'e8', sources: ['W001.COut'], targets: ['P002.In']},
        {id: 'e9', sources: ['P001.Out'], targets: ['W001.HIn']},
    ];

    public outObjects;

    public outConnections;

    private viewBox: string;

    constructor() {
    }

    ngOnInit() {
        this.viewBox = `0 0 300 200`;

        const elk = new ELK();

        const graph = {
            id: 'root',
            layoutOptions: {'elk.algorithm': 'layered'},
            children: this.visualObjects,
            edges: this.connections
        };

        elk.layout(graph)
            .then( (data) => {
                this.outObjects = data.children;
                this.outConnections = data.edges;
            })
            .catch(console.error);
    }

}
