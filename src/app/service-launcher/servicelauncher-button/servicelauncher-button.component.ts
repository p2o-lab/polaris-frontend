import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ServiceInterface} from '@p2olab/polaris-interface';
import * as Snap from 'snapsvg-cjs';

import { MatDialog } from '@angular/material/dialog';
import { ServiceVisualisation } from './service.draw';

@Component({
    selector: 'app-servicelauncher-button',
    templateUrl: './servicelauncher-button.component.html',
    styleUrls: ['./servicelauncher-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicelauncherButtonComponent implements OnInit, AfterViewInit {

    serviceRadius = 32; // radius of Service; also used for calculation for Annotation and Action
    xMid = 105; // Midpoint x of Service
    yMid = 105; // Midpoint y of Service

    @Input() currentService: ServiceInterface;
    @Output() openSettings: EventEmitter<any> = new EventEmitter();
    @Output() pinService: EventEmitter<any> = new EventEmitter();
    @Output() setAction: EventEmitter<any> = new EventEmitter();

    @ViewChild('myButton', {static: true}) svg: any;

    constructor(
        public dialog: MatDialog
    ) {

    }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
    ngOnInit():void {}

    ngAfterViewInit():void {
        const snap = Snap(this.svg.nativeElement);
        const serviceButton = new ServiceVisualisation(snap, this.serviceRadius, this.xMid, this.yMid,
          this.currentService, this.dialog, this.openSettings, this.pinService, this.setAction);
    }

    createNewButton(service:ServiceInterface, snap: Snap.Paper): void {
        snap.clear();
        const state = 'running';
        const name = service.name;
        const serviceButton = new ServiceVisualisation(snap, this.serviceRadius, this.xMid, this.yMid,
          this.currentService, this.dialog, this.openSettings, this.pinService, this.setAction);
    }

}
