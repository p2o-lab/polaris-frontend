import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {PumpComponent} from "../pump/pump.component";

@Component({
  selector: '[app-visual-object]',
  templateUrl: './visual-object.component.html',
  styleUrls: ['./visual-object.component.css']
})
export class VisualObjectComponent implements OnInit {

  @Input() public id;
  @Input() public x: number;
  @Input() public y: number;

  @Input() public rotation = 0;

  @Input() public type: string;



    component = PumpComponent; //Math.random() > 0.5 ? ValveComponent : PumpComponent;


    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
      /*
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(PumpComponent);

      let viewContainerRef = this.adHost.viewContainerRef;
      viewContainerRef.clear();

      let componentRef = viewContainerRef.createComponent(componentFactory);

      console.log(componentRef);
*/
  }

}
