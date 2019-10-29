import {Input} from '@angular/core';
import {MtpHmiObject} from '../hmi.service';

export abstract class AbstractSymbolComponent {
    static width: number = 30;
    static height: number = 30;

    static getXY(x: Readonly<number>, y: Readonly<number>, rotation: Readonly<number> = 0): { x: number, y: number } {
        const xCenter = x - this.width / 2;
        const yCenter = y - this.height / 2;
        const xRotated = xCenter * Math.cos(rotation * Math.PI / 180) - yCenter * Math.sin(rotation * Math.PI / 180);
        const yRotated = xCenter * Math.sin(rotation * Math.PI / 180) + yCenter * Math.cos(rotation * Math.PI / 180);
        return {
            x: xRotated + this.width / 2,
            y: yRotated + this.height / 2
        };
    }

    static getSymbolInformation(object: Readonly<MtpHmiObject>): MtpHmiObject {
        return {
            id: object.id,
            name: object.name || object.id,
            type: object.type || 'base',
            rotation: object.rotation || 0,
            x: object.x || 10,
            y: object.y || 10,
            width: this.width,
            height: this.height,
            properties: {
                portConstraints: 'FIXED_POS'
            }
        };
    }

    @Input() public object: MtpHmiObject;
    protected active: boolean = false;
}
