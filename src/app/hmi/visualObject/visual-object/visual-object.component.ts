import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {ObjectInterface} from '../../operator-view/operator-view.component';

@Component({
  selector: '[app-visual-object]',
  templateUrl: './visual-object.component.svg',
  styleUrls: ['./visual-object.component.css']
})
export class VisualObjectComponent implements OnInit {

  @Input() public object: ObjectInterface;
  // TODO: https://angular.io/guide/dynamic-component-loader
  // @ViewChild('here', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

  /*const inputs = {
    object: this.object
  };*/

  /*constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }*/

  ngOnInit() {
    /*const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ValveComponent);

    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.object = this.object;
*/
  }

}
