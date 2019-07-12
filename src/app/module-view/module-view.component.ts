import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModuleInterface} from '@p2olab/polaris-interface';
import {Observable} from 'rxjs';
import {ModuleService} from '../_services/module.service';
import {ServiceParameterDialogComponent} from '../service-parameter-dialog/service-parameter-dialog.component';

@Component({
    selector: 'app-module-view',
    templateUrl: './module-view.component.html',
    styleUrls: ['./module-view.component.css']
})
export class ModuleViewComponent {

    public modules$: Observable<ModuleInterface[]> = this.backend.modules;

    constructor(public backend: ModuleService,
                public dialog: MatDialog) {
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
