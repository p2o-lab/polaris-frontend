import {Input} from '@angular/core';
import {ObjectInterface} from '../operator-view/operator-view.component';
import {cos} from 'snapsvg';

export abstract class AbstractSymbolComponent {
    static width: number = 30;
    static height: number = 30;

    static getXY(x: number, y: number, rotation: number = 0): { x: number, y: number } {
        const x_center = x - this.width / 2;
        const y_center = y - this.height / 2;
        const x_new = x_center * Math.cos(rotation * Math.PI / 180) - y_center * Math.sin(rotation * Math.PI / 180);
        const y_new = x_center * Math.sin(rotation * Math.PI / 180) + y_center * Math.cos(rotation * Math.PI / 180);
        return {
            x: x_new + this.width /2,
            y: y_new + this.height/2
        };
    }

    static getSymbolInformation(object: ObjectInterface): Partial<ObjectInterface> {
        return {
            id: object.id,
            name: object.name || object.id,
            rotation: object.rotation || 0,
            width: this.width,
            height: this.height,
            properties: {
                portConstraints: 'FIXED_POS'
            }
        };
    }


    @Input() public object: ObjectInterface;
    protected active: boolean = false;
}
