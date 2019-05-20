import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModuleInterface} from '@p2olab/polaris-interface';
import {ServiceParameterDialogComponent} from '../service-parameter-dialog/service-parameter-dialog.component';
import {ModuleService} from '../_services/module.service';

@Component({
    selector: 'app-module-view',
    templateUrl: './module-view.component.html',
    styleUrls: ['./module-view.component.css']
})
export class ModuleViewComponent implements OnInit {

    modules$ = this.backend.modules;

    constructor(public backend: ModuleService,
                public dialog: MatDialog) {
    }

    ngOnInit() {
    }

    connect(module: string) {
        this.backend.connect(module).subscribe((data) => {
            console.log('Connect result', data);
        });
    }

    disconnect(module: string) {
        this.backend.disconnect(module).subscribe((data) => {
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
