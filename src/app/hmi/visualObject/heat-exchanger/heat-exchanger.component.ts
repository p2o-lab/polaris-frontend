import {Component} from '@angular/core';
import {MtpHmiObject} from '../../hmi.service';
import {AbstractSymbolComponent} from '../abstract-symbol.component';

@Component({
  selector: '[app-heat-exchanger]',
  templateUrl: './heat-exchanger.component.svg',
  styleUrls: ['./heat-exchanger.component.css']
})
export class HeatExchangerComponent extends AbstractSymbolComponent {

  static width: number = 30;
  static height: number = 30;

  static getSymbolInformation(object: MtpHmiObject): MtpHmiObject {
    return {
      ...super.getSymbolInformation(object),
      type: 'heatexchanger',
      ports: [
        {
          id: object.id + '.HIn',
          ...this.getXY(15, 0, object.rotation)
        },
        {
          id: object.id + '.HOut',
          ...this.getXY(15, 30, object.rotation)
        },
        {
          id: object.id + '.CIn',
          ...this.getXY(0, 15, object.rotation)
        },
        {
          id: object.id + '.COut',
          ...this.getXY(30, 15, object.rotation)
        }
      ]
    };
  }
}
