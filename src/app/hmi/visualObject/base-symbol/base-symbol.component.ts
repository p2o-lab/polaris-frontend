import {Component, Input, OnInit} from '@angular/core';

export abstract class AbstractSymbolComponent {
    static width = undefined;
    static height = undefined;


    @Input() public id;

    protected active = false;
}

@Component({
  selector: '[app-base-symbol]',
  templateUrl: './base-symbol.component.html',
  styleUrls: ['./base-symbol.component.css']
})
export class BaseSymbolComponent extends AbstractSymbolComponent implements OnInit {

    static width = 30;
    static height= 30;

  ngOnInit() {
  }



}


