import {Component, OnInit} from '@angular/core';
import {ElkPort} from 'elkjs';
import {MtpHmiObject} from '../../hmi.service';
import {AbstractSymbolComponent} from '../abstract-symbol.component';

@Component({
    selector: '[app-sink]',
    templateUrl: './sink.component.svg',
    styleUrls: ['./sink.component.css']
})
export class SinkComponent extends AbstractSymbolComponent implements OnInit {
    static width: number = 20;
    static height: number = 20;

    static getSymbolInformation(object: MtpHmiObject): MtpHmiObject {
        return {
            ...super.getSymbolInformation(object),
            type: 'sink',
            ports: [
                {
                    id: object.id + '.In',
                    ...this.getXY(0, 10, object.rotation)
                },
                ...object.ports.map((value: ElkPort) => {
                    return {
                        id: value.id,
                        ...this.getXY(0, 10, object.rotation)
                    };
                })
            ]
        };
    }

    ngOnInit() {
        console.log('add base symbol', this.object.id)
    }

}
