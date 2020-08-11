import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ModuleInterface, ModuleOptions} from '@p2olab/polaris-interface';
import {NGXLogger} from 'ngx-logger';
import {BackendService} from '../_services/backend.service';
import {ModuleService} from '../_services/module.service';

@Component({
    selector: 'app-new-pea',
    templateUrl: './new-pea.component.html',
    styleUrls: ['./new-pea.component.css']
})
export class NewPeaComponent implements OnInit {

    public formGroup: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public module: ModuleOptions,
                private backend: BackendService,
                private moduleService: ModuleService,
                private dialogRef: MatDialogRef<NewPeaComponent>,
                private snackBar: MatSnackBar,
                private logger: NGXLogger) {
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            id: new FormControl(this.module.id, [Validators.required, Validators.minLength(3)]),
            description: new FormControl(this.module.description),
            opcua_server_url: new FormControl(this.module.opcua_server_url,
                [Validators.required, Validators.pattern('opc.tcp://(.*)')]),
            authentication: new FormControl(this.module.username ? 'password' : 'anonymous'),
            username: new FormControl(this.module.username, Validators.minLength(3)),
            password: new FormControl(this.module.password, Validators.minLength(3))
        });
    }

    public addModule(): void {
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
