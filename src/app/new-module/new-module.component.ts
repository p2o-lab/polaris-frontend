import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatStepper} from '@angular/material';
import {ModuleOptions} from '@p2olab/polaris-interface';
import {NGXLogger} from 'ngx-logger';
import {BackendService} from '../_services/backend.service';
import {ModuleService} from '../_services/module.service';

@Component({
    selector: 'app-new-module',
    templateUrl: './new-module.component.html',
    styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent implements OnInit {

    authenticationOption: 'anonymous' | 'password' | 'certificate';

    @ViewChild('stepper', {static: false}) private myStepper: MatStepper;

    constructor(@Inject(MAT_DIALOG_DATA) public module: ModuleOptions,
                private backend: BackendService,
                private moduleService: ModuleService,
                private dialogRef: MatDialogRef<NewModuleComponent>,
                private snackBar: MatSnackBar,
                private logger: NGXLogger) {
    }

    ngOnInit() {
        if (this.module.username) {
            this.authenticationOption = 'password';
        } else {
            this.authenticationOption = 'anonymous';
        }
    }

    public addModule() {
        if (this.authenticationOption === 'anonymous') {
            this.module.username = null;
            this.module.password = null;
        }
        this.moduleService.addModule(this.module).subscribe(
            (data) => {
                this.snackBar.open(`Module ${this.module.id} succesfully added`, 'Dismiss');
                this.logger.debug('new module added', data);
                this.moduleService.updateModuleState({module: data});
            },
            (error) => {
                this.snackBar.open(JSON.stringify(error.error), 'Dismiss', {duration: 20000});
            });
        this.dialogRef.close();
    }
}
