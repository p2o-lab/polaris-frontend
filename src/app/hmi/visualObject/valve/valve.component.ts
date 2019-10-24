import {Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {BaseSymbolComponent} from "../base-symbol/base-symbol.component";

@Component({
  selector: '[app-valve]',
  templateUrl: './valve.component.html',
  styleUrls: ['./valve.component.css']
})
export class ValveComponent extends BaseSymbolComponent implements OnInit {

    getWidth() {
        return 20;
    }

    getHeight() {
        return 20;
    }
  ngOnInit() {
  }

  select() {
    console.log('switch');
    this.active = !this.active;
  }

}
