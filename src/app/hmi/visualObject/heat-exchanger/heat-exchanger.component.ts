import { Component, OnInit } from '@angular/core';
import {AbstractSymbolComponent} from "../base-symbol/base-symbol.component";

@Component({
  selector: 'svg:g[app-heat-exchanger]',
  templateUrl: './heat-exchanger.component.html',
  styleUrls: ['./heat-exchanger.component.css']
})
export class HeatExchangerComponent extends AbstractSymbolComponent implements OnInit {


  ngOnInit() {
  }

}
