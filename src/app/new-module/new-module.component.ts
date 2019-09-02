import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatStepper} from '@angular/material';
import {ModuleOptions} from '@p2olab/polaris-interface';
import {BackendService} from '../_services/backend.service';
import {ModuleService} from '../_services/module.service';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-new-module',
    templateUrl: './new-module.component.html',
    styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent {

    @ViewChild('stepper', {static: false}) private myStepper: MatStepper;

    constructor(@Inject(MAT_DIALOG_DATA) public module: ModuleOptions,
                private backend: BackendService,
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
                this.backend.convertMtp(file).subscribe((data: { modules: ModuleOptions[] }) => {
                    this.module = data.modules[0];
                    resolve();
                });
            } else {
                const reader: FileReader = new FileReader();
                reader.onload = (e: Event) => {
                    this.module = JSON.parse(reader.result.toString()).modules[0] as ModuleOptions;
                    resolve();
                };
                reader.readAsText(file);
            }
        });
        //this.module.opcua_server_url = this.addDefaultPort(this.module.opcua_server_url);
        this.myStepper.next();
    }

    public addModule() {
        this.moduleService.addModule(this.module).subscribe(
            (data) => {
                this.snackBar.open(`Module ${this.module.id} succesfully added`, 'Dismiss');
            },
            (error) => {
                this.snackBar.open(JSON.stringify(error.error), 'Dismiss');
            });
        this.dialogRef.close();
    }
}
