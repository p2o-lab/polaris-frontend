import {Component, OnInit} from '@angular/core';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-module-view',
  templateUrl: './module-view.component.html',
  styleUrls: ['./module-view.component.css']
})
export class ModuleViewComponent implements OnInit {

  constructor(public backend: BackendService) {
  }

  ngOnInit() {
  }

  connect(module: string) {
    this.backend.connect(module).subscribe(data => console.log('Connect result', data));

  }

  disconnect(module: string) {
    this.backend.disconnect(module).subscribe(data => console.log('Disconnect result', data));
  }

  remove(module: string) {
    this.backend.removeModule(module).subscribe(data => console.log('Remove result', data));
  }

  add(moduleOptions: string) {
    this.backend.addModule(moduleOptions).subscribe(data => console.log('Add result', data));
  }


}
