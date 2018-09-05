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

  constructor(private backend: BackendService) {
  }

  ngOnInit() {
    this.backend.refreshModules();

    // update modules without replacing the whole object since this would close the accordion
    this.backend.modules.subscribe((modulesUpdates: ModuleInterface[]) => {
      // this.modules = modules;
      modulesUpdates.forEach((moduleUpdated) => {
        const module = this.modules.find(moduleFind => moduleFind.id === moduleUpdated.id);
        if (module) {
          moduleUpdated.services.forEach(serviceUpdated => {
            const service = module.services.find(serviceFind => serviceFind.name === serviceUpdated.name);
            service.status = serviceUpdated.status;
          });
        } else {
          this.modules.push(moduleUpdated);
        }
      });
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
