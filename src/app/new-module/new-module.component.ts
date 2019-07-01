import {Component, ViewChild} from '@angular/core';
import {MatDialogRef, MatSnackBar, MatStepper} from '@angular/material';
import {BackendService} from '../_services/backend.service';
import {ModuleService} from '../_services/module.service';

@Component({
  selector: 'app-new-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent {

  public modules: ModuleOptions[];

  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(private backend: BackendService,
              private moduleService: ModuleService,
              private dialogRef: MatDialogRef<NewModuleComponent>,
              private snackBar: MatSnackBar) {
  }

  /**
   * Load content of file, convert it if it is an MTP, and save the results in this.modules
   * @param event
   */
  public async previewFile(event) {
      const file: File = event.target.files[0];
      await new Promise((resolve) => {
          if (file.name.endsWith('.mtp') || file.name.endsWith('.zip')) {
              this.backend.convertMtp(file).subscribe((data) => {
                  this.modules = <ModuleOptions[]> data['modules'];
                  this.myStepper.next();
                  resolve();
              });
          } else {
              const reader: FileReader = new FileReader();
              reader.onload = (e: Event) => {
                  this.modules = <ModuleOptions[]> JSON.parse(reader.result.toString()).modules;
                  this.myStepper.next();
                  resolve();
              };
              reader.readAsText(file);
          }
      });
      this.modules.forEach((mod) => mod.opcua_server_url = this.addDefaultPort(mod.opcua_server_url));
  }

  /**
   * Add default port (4840) to server url if not present
   * @param opcuaServerUrl
   */
  public addDefaultPort(opcuaServerUrl: string): string {
      const re = new RegExp('(opc\.tcp):\/\/([^:\/]+)(:[0-9]+)?(\S*)?');
      return opcuaServerUrl.replace(re, (match, scheme, host, port, path) => {
          return `${scheme}://${host}${port || ':4840'}${path || ''}`;
      });
  }

  public addModule() {
      this.modules.forEach((module) => {
          this.moduleService.addModule(module).subscribe(
              (data) => {
                  this.snackBar.open(`Module ${module.id} succesfully added`, 'Dismiss');
              },
              (error) => {
                  this.snackBar.open(JSON.stringify(error.error), 'Dismiss');
              });
      });
      this.dialogRef.close();

  }
}

export interface ModuleOptions {
    id: string;
    opcua_server_url: string;
    hmi_url?: string;
    services: any[];
    process_values: any[];
}
