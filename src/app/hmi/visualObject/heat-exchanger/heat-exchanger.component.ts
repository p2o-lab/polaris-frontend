import {Component, OnInit} from '@angular/core';
import {ObjectInterface} from '../../operator-view/operator-view.component';
import {AbstractSymbolComponent} from '../abstract-symbol.component';

@Component({
  selector: '[app-heat-exchanger]',
  templateUrl: './heat-exchanger.component.html',
  styleUrls: ['./heat-exchanger.component.css']
})
export class HeatExchangerComponent extends AbstractSymbolComponent implements OnInit {

  static width: number = 30;
  static height: number = 30;

  static getSymbolInformation(object: ObjectInterface): Partial<ObjectInterface> {
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

  ngOnInit() {
  }

}
