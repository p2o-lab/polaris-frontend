import {Component, OnInit} from '@angular/core';
import {MtpHmiObject} from '../../hmi.service';
import {AbstractSymbolComponent} from '../abstract-symbol.component';

@Component({
  selector: '[app-tank]',
  templateUrl: './tank.component.svg',
  styleUrls: ['./tank.component.css']
})
export class TankComponent extends AbstractSymbolComponent implements OnInit {
  static width: number = 30;
  static height: number = 60;

  static getSymbolInformation(object: MtpHmiObject): MtpHmiObject {
    return {
      ...super.getSymbolInformation(object),
      type: 'tank',
      ports: [
        {
          id: object.id + '.In',
          x: 15,
          y: 0
        },
        {
          id: object.id + '.Out',
          x: 15,
          y: 60
        }
      ]
    };
  }

  public level: number = 35;

  ngOnInit() {
  }

  select() {
    console.log('switch');
    this.level += 10;
  }

}
