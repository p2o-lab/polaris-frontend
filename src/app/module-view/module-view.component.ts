import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModuleInterface, ServiceInterface} from '@plt/pfe-ree-interface';
import {BackendService} from '../_services/backend.service';
import {ServiceParameterDialogComponent} from '../service-parameter-dialog/service-parameter-dialog.component';

@Component({
  selector: 'app-module-view',
  templateUrl: './module-view.component.html',
  styleUrls: ['./module-view.component.css']
})
export class ModuleViewComponent implements OnInit {

  constructor(public backend: BackendService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.backend.refreshModules();
  }

  connect(module: string) {
      this.backend.connect(module).subscribe((data) => {
          console.log('Connect result', data);
      });

  }

  disconnect(module: string) {
      this.backend.disconnect(module).subscribe((data) => {
          const index = this.backend.modules.findIndex((mod) => module === mod.id);
          this.backend.modules.splice(index, 1);
          console.log('Disconnect result', data);
      });
  }

  remove(module: string) {
    this.backend.removeModule(module).subscribe((data) => console.log('Remove result', data));
  }

  configure(module: ModuleInterface) {
    const dialogRef = this.dialog.open(ServiceParameterDialogComponent, {
      data: module
    });
  }

}
