import {Component, OnInit} from '@angular/core';
import {ObjectInterface} from '../../operator-view/operator-view.component';
import {AbstractSymbolComponent} from '../abstract-symbol.component';

@Component({
    selector: '[app-pump]',
    templateUrl: './pump.component.svg',
    styleUrls: ['./pump.component.css']
})
export class PumpComponent extends AbstractSymbolComponent implements OnInit {

    static height: number = 30;
    static width: number = 30;

    static getSymbolInformation(object: ObjectInterface): Partial<ObjectInterface> {
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
                }
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
