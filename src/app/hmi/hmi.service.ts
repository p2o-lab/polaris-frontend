import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {NGXLogger} from 'ngx-logger';
import {SettingsService} from '../_services/settings.service';
import * as hmiJson from './asset/hmi_dose.json';

export interface MtpHmiJson {
    children: MtpHmiObject[];
    edges: ElkEdge[];
}

export interface ElkJsonInterface {
    children: ElkNode[];
    edges: ElkEdge[];
}

export interface ElkObject {
    id: string;
    layoutOptions?: object;
}

export interface ElkNodePortLabel extends ElkObject {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    labels?: ElkLabel[];
}

export interface ElkNode extends ElkNodePortLabel {
    ports?: ElkPort[];
    children?: ElkNode[];
    edges?: ElkEdge[];
}

// tslint:disable-next-line:no-empty-interface
export interface ElkPort extends ElkNodePortLabel {

}

export type ElkEdge = ElkPrimitiveEdge | ElkExtendedEdge;

export interface ElkPoint {
    x: number;
    y: number;
}

export interface ElkLabel extends ElkObject {
    text: string;
}

export interface ElkPrimitiveEdge extends ElkObject {
    source: string;
    sourcePort?: string;
    target: string;
    targetPort?: string;
    sourcePoint?: ElkPoint;
    targetPoint?: ElkPoint;
    bendPoints?: ElkPoint[];
    labels?: ElkLabel[];
}

export interface ElkExtendedEdge extends ElkObject {
    sources: string[];
    targets: string[];
    sections?: ElkEdgeSection[];
    labels?: ElkLabel[];
}

export interface ElkEdgeSection extends ElkObject {
    startPoint: ElkPoint;
    endPoint: ElkPoint;
    bendPoints?: ElkPoint[];
    incomingShape?: string;
    outgoingShape?: string;
    incomingSections?: ElkEdgeSection[];
    outgoingSections?: ElkEdgeSection[];
}



export interface MtpHmiObject extends ElkNode {
    type: string;
    name?: string;
    rotation?: number;
    properties?: object;
}

@Injectable({
    providedIn: 'root'
})
export class HmiService {

    public testHmi: MtpHmiJson = {
        children: [
            {
                id: 'P001',
                name: 'P1',
                type: 'pump',
                x: 100,
                y: 200
            },
            {
                id: 'P002',
                type: 'pump',
                rotation: -90
            },
            {
                id: 'V001',
                type: 'valve',
                rotation: 90
            },
            {
                id: 'V002',
                type: 'valve'
            },
            {
                id: 'T001',
                type: 'tank'
            },
            {
                id: 'T002',
                type: 'tank'
            },
            {
                id: 'W001',
                type: 'heatexchanger',
                rotation: 0
            },
            {
                id: 'base001',
                name: 'B1',
                type: 'base'
            }
        ],
        edges: [
            {id: 'h1', source: 'W001', sourcePort: 'W001.HOut', target: 'V001', targetPort: 'V001.In'},
            {id: 'h2', sources: ['V001.Out'], targets: ['T001.In']},
            {id: 'h3', sources: ['T001.Out'], targets: ['P001.In']},
            {id: 'h4', sources: ['P001.Out'], targets: ['W001.HIn']},

            {id: 'c1', sources: ['base001.Out'], targets: ['V002.In']},
            {id: 'c2', sources: ['V002.Out'], targets: ['T002.In']},
            {id: 'c3', sources: ['T002.Out'], targets: ['P002.In']},
            {id: 'c4', sources: ['P002.Out'], targets: ['W001.CIn']},
            {id: 'c5', sources: ['W001.COut'], targets: ['T002.In']}
        ]
    };

    constructor(private http: HttpClient,
                private settings: SettingsService,
                private snackBar: MatSnackBar,
                private logger: NGXLogger) {
    }

    getHmi(hmi: string): MtpHmiJson {
        switch (hmi) {
            case 'test':
                return this.testHmi;
            case 'dose':
                return hmiJson as MtpHmiJson;
        }
    }

}
