import {Component, OnInit} from '@angular/core';
import {BaseSymbolComponent} from '../base-symbol/base-symbol.component';
import {AbstractSymbolComponent} from '../abstract-symbol.component';
import {ObjectInterface} from '../../operator-view/operator-view.component';

@Component({
    selector: 'svg:g[app-valve]',
    templateUrl: './valve.component.svg',
    styleUrls: ['./valve.component.css']
})
export class ValveComponent extends AbstractSymbolComponent implements OnInit {

    static width: number = 30;
    static height: number = 30;

    static getSymbolInformation(object: ObjectInterface): Partial<ObjectInterface> {
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
