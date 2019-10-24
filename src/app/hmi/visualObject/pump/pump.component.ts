import {Component, Input, OnInit} from '@angular/core';
import {AbstractSymbolComponent, BaseSymbolComponent} from '../base-symbol/base-symbol.component';

@Component({
  selector: 'svg:g[app-pump]',
  templateUrl: './pump.component.html',
  styleUrls: ['./pump.component.css']
})
export class PumpComponent extends AbstractSymbolComponent implements OnInit {

    static height = 30;
    static width = 30;

    @Input() public rotation = 0;

    public height = PumpComponent.height;
    public width = PumpComponent.width;

    static getSymbolInformation(name: string, rotation: number) {
        return {
            id: name,
            type: 'pump',
            rotation: rotation,
            width: this.width, height: this.height,
            ports: [
                {id: name + '.In',
                    x: this.width / 2 - 15 * Math.cos(rotation * Math.PI / 180) + 0 * Math.sin(rotation * Math.PI / 180),
                    y: this.height / 2 - 15 * Math.sin(rotation * Math.PI / 180) + 0 * Math.cos(rotation * Math.PI / 180)},
                {id: name + '.Out',
                    x: this.width / 2 + 15 * Math.cos(rotation * Math.PI / 180) + 0 * Math.sin(rotation * Math.PI / 180),
                    y: this.height / 2 + 15 * Math.sin(rotation * Math.PI / 180) + 0 * Math.cos(rotation * Math.PI / 180)
                }
            ],
            properties: {
                portConstraints: 'FIXED_POS'
            }
        };
    }




  ngOnInit() {
  }

  select() {
    console.log('switch');
    this.active = !this.active;
  }

}
