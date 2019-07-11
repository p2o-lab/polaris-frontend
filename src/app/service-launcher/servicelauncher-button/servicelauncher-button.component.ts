import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as Snap from 'snapsvg-cjs';

import { MatDialog } from '@angular/material';
import { Service } from '../../../models/service.model';
import { ServiceVisualisation } from './service.draw';

@Component({
    selector: 'app-servicelauncher-button',
    templateUrl: './servicelauncher-button.component.html',
    styleUrls: ['./servicelauncher-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicelauncherButtonComponent implements OnInit, AfterViewInit {

    serviceRadius: number = 32; // radius of Service; also used for calculation for Annotation and Action
    xMid: number = 105; // Midpoid x of Service
    yMid: number = 105; // Midpoid y of Service

    @Input() currentService: Service;
    @Output() openSettings: EventEmitter<any> = new EventEmitter();
    @Output() pinService: EventEmitter<any> = new EventEmitter();
    @Output() setAction: EventEmitter<any> = new EventEmitter();

    @ViewChild('myButton') svg;

    constructor(
        public dialog: MatDialog
    ) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        const snap = Snap(this.svg.nativeElement);
        const serviceButton = new ServiceVisualisation(snap, this.serviceRadius, this.xMid, this.yMid,
          this.currentService, this.dialog, this.openSettings, this.pinService, this.setAction);
    }

    createNewButton(service, snap: Snap.Paper) {
        snap.clear();
        const state = 'running';
        const name = service.name;
        const serviceButton = new ServiceVisualisation(snap, this.serviceRadius, this.xMid, this.yMid,
          this.currentService, this.dialog, this.openSettings, this.pinService, this.setAction);
    }

}
