import {Component, OnInit} from '@angular/core';
import {AbstractSymbolComponent} from '../abstract-symbol.component';
import {MtpHmiObject} from '../../hmi.service';
import {ElkPort} from 'elkjs';

@Component({
    selector: '[app-source]',
    templateUrl: './source.component.svg',
    styleUrls: ['./source.component.css']
})
export class SourceComponent extends AbstractSymbolComponent implements OnInit {
    static width: number = 20;
    static height: number = 20;

    static getSymbolInformation(object: MtpHmiObject): MtpHmiObject {
        return {
            ...super.getSymbolInformation(object),
            type: 'source',
            ports: [
                {
                    id: object.id + '.Out',
                    ...this.getXY(20, 10, object.rotation)
                },
                ...object.ports.map((value: ElkPort) => {
                    return {
                        id: value.id,
                        ...this.getXY(20, 10, object.rotation)
                    };
                })
            ]
        };
    }

    ngOnInit() {
        console.log('add base symbol', this.object.id)
    }

}
