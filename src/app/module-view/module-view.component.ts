import {Component, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {ModuleInterface} from 'pfe-ree-interface';

@Component({
  selector: 'app-module-view',
  templateUrl: './module-view.component.html',
  styleUrls: ['./module-view.component.css']
})
export class ModuleViewComponent implements OnInit {

  public modules: ModuleInterface[] = [];

  constructor(public backend: BackendService) {
  }

  ngOnInit() {
    this.backend.refreshModules();
    this.backend.modules.subscribe((modules: ModuleInterface[]) => {
      this.modules = modules;
      /*if (this.modules) {
        modules.forEach((module) => {
          let m = this.modules.find(m => m.id === module.id);
          if (m) {
            module.services.forEach(service => {
              let s1 = m.services.find(s => s.name === service.name);
              s1.strategies = service.strategies;
            });

          }
          else {
            this.modules.push(module);
          }
        });
      }*/
    });
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

}
