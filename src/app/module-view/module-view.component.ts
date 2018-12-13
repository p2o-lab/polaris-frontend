import {Component, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {ModuleInterface} from 'pfe-ree-interface';
import {MatDialog} from '@angular/material';
import {ServiceParameterDialogComponent} from '../service-parameter-dialog/service-parameter-dialog.component';
import {ServiceInterface} from 'pfe-ree-interface/dist/interfaces';

@Component({
  selector: 'app-module-view',
  templateUrl: './module-view.component.html',
  styleUrls: ['./module-view.component.css']
})
export class ModuleViewComponent implements OnInit {

  public modules: ModuleInterface[] = [];

  constructor(private backend: BackendService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.backend.refreshModules();

    // update modules without replacing the whole object since this would close the accordion
    this.backend.modules.subscribe((modulesUpdates: ModuleInterface[]) => {
      // this.modules = modules;
      modulesUpdates.forEach((moduleUpdated: ModuleInterface) => {
        const module = this.modules.find(moduleFind => moduleFind.id === moduleUpdated.id);
        if (module) {
            if (moduleUpdated.services && module.services) {
                moduleUpdated.services.forEach((serviceUpdated: ServiceInterface) => {
                    const service: ServiceInterface = module.services.find(serviceFind => serviceFind.name === serviceUpdated.name);
                    service.status = serviceUpdated.status;
                    service.error = serviceUpdated.error;
                    service.lastChange = serviceUpdated.lastChange;
                });
            }
        } else {
          this.modules.push(moduleUpdated);
        }
      });
    });
  }

  connect(module: string) {
      this.backend.connect(module).subscribe(data => {
          console.log('Connect result', data);
          const index = this.modules.findIndex(mod => module === mod.id);
          this.modules.splice(index, 1);
          this.backend.refreshModules();
      });

  }

  disconnect(module: string) {
      this.backend.disconnect(module).subscribe((data) => {
          const index = this.modules.findIndex(mod => module === mod.id);
          this.modules.splice(index, 1);
          this.backend.refreshModules();
          console.log('Disconnect result', data);
      });
  }

  remove(module: string) {
    this.backend.removeModule(module).subscribe(data => console.log('Remove result', data));
  }

  configure(module: ModuleInterface) {
    const dialogRef = this.dialog.open(ServiceParameterDialogComponent, {
      data: module
    });
  }

}
