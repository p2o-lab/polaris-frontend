import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {NGXLogger} from 'ngx-logger';
import {SettingsService} from '../_services/settings.service';
import {ElkEdge, ElkNode} from './elkjs';
import {hmiDoseJson} from './asset/hmi_dose';

export interface MtpHmiJson {
    children: MtpHmiObject[];
    edges: ElkEdge[];
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
                type: 'pump'
            },
            {
                id: 'V001',
                type: 'valve'
            },
            {
                id: 'V002',
                type: 'valve'
            },
            {
                id: 'V003',
                type: 'valve'
            },
            {
                id: 'V004',
                type: 'valve'
            },
            {
                id: 'V005',
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
                id: 'T003',
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
                type: 'base',
                rotation: -90
            }
        ],
        edges: [
            {id: 'h1', source: 'W001', sourcePort: 'W001.HOut', target: 'V001', targetPort: 'V001.In'},
            {id: 'h2', sources: ['V001.Out'], targets: ['T001.In']},
            {id: 'h3', sources: ['T001.Out'], targets: ['V005.In']},
            {id: 'h3', sources: ['V005.Out'], targets: ['P001.In']},
            {id: 'h4', sources: ['P001.Out'], targets: ['V004.In']},
            {id: 'h4', sources: ['V004.Out'], targets: ['W001.HIn']},
            {id: 'h5', sources: ['P001.Out'], targets: ['V003.In']},
            {id: 'h6', source: 'V003', sourcePort: 'V003.Out', target: 'T003', targetPort: 'T003.In'},

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
                return hmiDoseJson as MtpHmiJson;
        }
    }

}
