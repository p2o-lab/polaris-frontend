import {Component, OnInit} from '@angular/core';
import {MtpHmiObject} from '../../hmi.service';
import {AbstractSymbolComponent} from '../abstract-symbol.component';

@Component({
    selector: 'svg:g[app-valve]',
    templateUrl: './valve.component.svg',
    styleUrls: ['./valve.component.css']
})
export class ValveComponent extends AbstractSymbolComponent implements OnInit {

    static width: number = 30;
    static height: number = 30;

    static getSymbolInformation(object: MtpHmiObject): MtpHmiObject {
        return {
            ...super.getSymbolInformation(object),
            type: 'valve',
            ports: [
                {
                    id: object.id + '.In',
                    ...this.getXY(0, 15, object.rotation)
                },
                {
                    id: object.id + '.Out',
                    ...this.getXY(30, 15, object.rotation)
                }
            ]
        };
    }

    ngOnInit() {
    }

    select() {
        console.log('switch');
        this.active = !this.active;
    }

}
