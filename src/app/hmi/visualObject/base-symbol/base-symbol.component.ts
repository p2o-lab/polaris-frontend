import {Component, OnInit} from '@angular/core';
import {AbstractSymbolComponent} from '../abstract-symbol.component';
import {ObjectInterface} from '../../operator-view/operator-view.component';
import {subscribeOn} from 'rxjs/operators';

@Component({
    selector: '[app-base-symbol]',
    templateUrl: './base-symbol.component.svg',
    styleUrls: ['./base-symbol.component.css']
})
export class BaseSymbolComponent extends AbstractSymbolComponent implements OnInit {
    static width: number = 30;
    static height: number = 30;

    static getSymbolInformation(object: ObjectInterface): Partial<ObjectInterface> {
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
                }
            ]
        };
    }

    ngOnInit() {
        console.log('add base symbol', this.object.id)
    }

}
