import {Component, OnInit} from '@angular/core';
import {MtpHmiObject} from '../../hmi.service';
import {AbstractSymbolComponent} from '../abstract-symbol.component';
import {ElkPort} from '../../elkjs';

@Component({
    selector: '[app-pump]',
    templateUrl: './pump.component.svg',
    styleUrls: ['./pump.component.css']
})
export class PumpComponent extends AbstractSymbolComponent implements OnInit {

    static height: number = 30;
    static width: number = 30;

    static getSymbolInformation(object: MtpHmiObject): MtpHmiObject {
        return {
            ...super.getSymbolInformation(object),
            type: 'pump',
            ports: [
                {
                    id: object.id + '.In',
                    ...this.getXY(0, 15, object.rotation)
                },
                {
                    id: object.id + '.Out',
                    ...this.getXY(30, 15, object.rotation)
                },
                ...object.ports.map((value: ElkPort) => {
                    const a = (object.y + object.height / 2 >= value.y) ?
                        this.getXY(0, 15, object.rotation) : this.getXY(30, 15, object.rotation);
                    return {
                        id: value.id,
                        ...a
                    };
                })
            ]
        };
    }

    ngOnInit() {
        console.log('add pump symbol', this.object.id);
    }

    select() {
        console.log('switch');
        this.active = !this.active;
    }

}
