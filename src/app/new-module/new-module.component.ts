import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ModuleInterface, ModuleOptions} from '@p2olab/polaris-interface';
import {NGXLogger} from 'ngx-logger';
import {Subscription} from 'rxjs';
import {BackendService} from '../_services/backend.service';
import {ModuleService} from '../_services/module.service';

@Component({
    selector: 'app-new-module',
    templateUrl: './new-module.component.html',
    styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent implements OnInit {

    public formGroup: FormGroup;
    subscription: Subscription;

    constructor(@Inject(MAT_DIALOG_DATA) public module: ModuleOptions,
                private backend: BackendService,
                private moduleService: ModuleService,
                private dialogRef: MatDialogRef<NewModuleComponent>,
                private snackBar: MatSnackBar,
                private logger: NGXLogger) {
    }

    ngOnInit() {
        this.formGroup = new FormGroup({
            id: new FormControl(this.module.id, [Validators.required, Validators.minLength(3)]),
            description: new FormControl(this.module.description),
            opcua: new FormControl(this.module.opcua_server_url,
                [Validators.required, Validators.pattern('opc.tcp://(.*)')]),
            authentication: new FormControl(this.module.username ? 'password' : 'anonymous'),
            username: new FormControl(this.module.username),
            password: new FormControl(this.module.password)
        });

        this.subscription = this.formGroup.get('authentication').valueChanges.subscribe(value => {
            if(value==='password'){
                this.formGroup.get('username').setValidators([Validators.required, Validators.minLength(3)]);
                this.formGroup.get('password').setValidators([Validators.required, Validators.minLength(3)]);
            }
            else {
                this.formGroup.get('username').setValidators(null);
                this.formGroup.get('password').setValidators(null);
            }
            this.formGroup.get('username').updateValueAndValidity();
            this.formGroup.get('password').updateValueAndValidity();
        })
    }

    public addModule() {
        this.module = { ...this.module, ...this.formGroup.value};
        this.logger.debug('Send new module options to backend', this.module);
        this.moduleService.addModule(this.module).subscribe(
            (data: ModuleInterface[]) => {
                this.snackBar.open(`Module ${this.module.id} succesfully added`, 'Dismiss');
                this.logger.debug('new module added', data[0]);
                this.moduleService.updateModuleState(data[0]);
            },
            (error) => {
                this.snackBar.open(JSON.stringify(error.error), 'Dismiss', {duration: 20000});
            });
        this.dialogRef.close();
    }
}