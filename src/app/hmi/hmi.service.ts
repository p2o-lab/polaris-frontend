import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ElkExtendedEdge, ElkNode, ElkPrimitiveEdge} from 'elkjs/lib/elk.bundled';
import {NGXLogger} from 'ngx-logger';
import {SettingsService} from '../_services/settings.service';
import {hmiDoseJson} from './asset/hmi_dose';

export interface MtpHmiJson {
    children: MtpHmiObject[];
    edges: Array<ElkPrimitiveEdge | ElkExtendedEdge>;
}

export interface MtpHmiObject extends ElkNode {
    type?: string;
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
            {id: 'h2', source: 'V001', sourcePort: 'V001.Out', target: 'T001', targetPort: 'T001.In'},
            {id: 'h3', source: 'T001', sourcePort: 'T001.Out', target: 'V005', targetPort: 'V005.In'},
            {id: 'h4', source: 'V005', sourcePort: 'V005.Out', target: 'P001', targetPort: 'P001.In'},
            {id: 'h5', source: 'P001', sourcePort: 'P001.Out', target: 'V004', targetPort: 'V004.In'},
            {id: 'h6', source: 'V004', sourcePort: 'V004.Out', target: 'W001', targetPort: 'W001.HIn'},
            {id: 'h7', source: 'P001', sourcePort: 'P001.Out', target: 'V003', targetPort: 'V003.In'},
            {id: 'h8', source: 'V003', sourcePort: 'V003.Out', target: 'T003', targetPort: 'T003.In'},

            {id: 'c1', source: 'base001', sourcePort: 'base001.Out', target: 'V002', targetPort: 'V002.In'},
            {id: 'c2', source: 'V002', sourcePort: 'V002.Out', target: 'T002', targetPort: 'T002.In'},
            {id: 'c3', source: 'T002', sourcePort: 'T002.Out', target: 'P002', targetPort: 'P002.In'},
            {id: 'c4', source: 'P002', sourcePort: 'P002.Out', target: 'W001', targetPort: 'W001.CIn'},
            {id: 'c5', source: 'W001', sourcePort: 'W001.COut', target: 'T002', targetPort: 'T002.In'}
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
            default:
                return this.testHmi;
        }
    }

}
