import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatStepper} from '@angular/material';
import {ModuleOptions} from '@p2olab/polaris-interface';
import {BackendService} from '../_services/backend.service';
import {ModuleService} from '../_services/module.service';

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
