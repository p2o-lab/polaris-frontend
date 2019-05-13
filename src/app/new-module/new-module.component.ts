import {Component, ViewChild} from '@angular/core';
import {MatSnackBar, MatStepper} from '@angular/material';
import {Router} from '@angular/router';
import {BackendService} from '../_services/backend.service';

@Component({
  selector: 'app-new-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent {

  public modules: ModuleOptions[];


  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(private backend: BackendService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  public previewFile(event) {
      const file: File = event.target.files[0];
      if (file.name.endsWith('.mtp') || file.name.endsWith('.zip')){
        this.backend.convertMtp(file).subscribe((data) => {
            this.modules = <ModuleOptions[]> data['modules'];
            this.myStepper.next();
        })
      } else {
          const reader: FileReader = new FileReader();
          reader.onload = (e: Event) => {
              this.modules = <ModuleOptions[]> JSON.parse(reader.result.toString()).modules;
              this.myStepper.next();
          };
          reader.readAsText(file);
      }
  }

  public addModule() {
      this.modules.forEach((module) => {
          this.backend.addModule(module).subscribe(
              (data) => {
                  this.snackBar.open(`Module ${module.id} succesfully added`, 'Dismiss');
              },
              (error) => {
                  this.snackBar.open(JSON.stringify(error.error), 'Dismiss');
              });
      });
      this.router.navigate(['/modules']);

  }

  public cancel() {
    this.router.navigate(['/modules']);
  }
}

export interface ModuleOptions {
    id: string;
    opcua_server_url: string;
    hmi_url?: string;
    services: any[];
    process_values: any[];
}