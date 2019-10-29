import {Component, OnInit} from '@angular/core';
import {AbstractSymbolComponent} from '../abstract-symbol.component';
import {MtpHmiObject} from '../../hmi.service';
import {ElkPort} from '../../elkjs';

@Component({
    selector: '[app-base-symbol]',
    templateUrl: './base-symbol.component.svg',
    styleUrls: ['./base-symbol.component.css']
})
export class BaseSymbolComponent extends AbstractSymbolComponent implements OnInit {
    static width: number = 30;
    static height: number = 30;

    static getSymbolInformation(object: MtpHmiObject): MtpHmiObject {
        return {
            ...super.getSymbolInformation(object),
            type: 'base',
            ports: [
                {
                    id: object.id + '.In',
                    ...this.getXY(15, 0, object.rotation)
                },
                {
                    id: object.id + '.Out',
                    ...this.getXY(15, 30, object.rotation)
                },
                ...object.ports.map((value: ElkPort) => {
                    const a = (object.y + object.height / 2 >= value.y) ?
                        this.getXY(15, 0, object.rotation) : this.getXY(15, 30, object.rotation);
                    return {
                        id: value.id,
                        ...a
                    };
                })
            ]
        };
    }

    ngOnInit() {
        console.log('add base symbol', this.object.id)
    }

}
