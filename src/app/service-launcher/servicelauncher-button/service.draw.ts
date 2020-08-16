import {EventEmitter} from '@angular/core';
import {ServiceInterface} from '@p2olab/polaris-interface';
import {fromEvent, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as Snap from 'snapsvg-cjs';

import { MatDialog } from '@angular/material/dialog';
import {Action} from './action.draw';
import {Annotation} from './annotation.draw';
import {Flag} from './flag.draw';
import {Icon} from './icon.draw';

declare let mina: any;

export class ServiceVisualisation {
  // Instance in Service
  flag: Flag;
  annotation: Annotation;
  action: Action;

  // Constance
  path: Icon;
  radius: number;
  radiusClicked: number;
  xMid: number;
  yMid: number;
  iconScale = 40;
  background: any;
  serviceLauncherDiv: any;

  // variables for current Service
  serviceName: string;
  serviceState: string;
  pinned: boolean;
  isSelfCompleting = false;
  // TODO: Add drawing for default
  isDefault = false;
  procedure = '';

  // Variables for reuse in the methods
  clickedService: boolean; // true, if Service is clicked
  serviceCircle: Snap.Paper; // Circle of Service
  iconSvg: Snap.Paper; // Icon of Service
  serviceStateText: Snap.Paper; // Shows Service State
  serviceNameText: Snap.Paper; // Shows Name of Service

  constructor(
    service: Snap.Paper,
    serviceRadius: number,
    xMid: number,
    yMid: number,
    currentService: ServiceInterface,
    dialog: MatDialog,
    openSettings: EventEmitter<any>,
    pinService: EventEmitter<any>,
    setAction: EventEmitter<any>) {
    // set Constance
    this.serviceState = currentService.status;
    this.serviceName = currentService.name;

    this.path = Icon.getIcon(this.serviceState);
    this.radius = serviceRadius;
    this.radiusClicked = 1.5 * this.radius; // set Radius for clicked Service
    this.xMid = xMid;
    this.yMid = yMid;
    this.clickedService = false; // Service is not clicked by default

    // set background
    this.background = document.getElementsByClassName('background');

    // document.getElementById('buttonDiv').id = this.serviceName
    const element = document.getElementById('buttonDiv');
    element.id = this.serviceName;
    element.classList.add(this.serviceName);

    document.getElementById('buttonDiv');

    // get current procedure id, selfCompleting, default for drawing
    currentService.procedures.forEach((curProcedure) => {
      if (curProcedure.name === currentService.currentProcedure) {
        this.procedure = curProcedure.id;
        this.isSelfCompleting = curProcedure.isSelfCompleting;
        this.isDefault = curProcedure.isDefault;
      }
    });

    // add all SVGs
    // generate flag for Service
    this.flag = new Flag(service, serviceRadius, xMid, yMid, currentService,
      dialog, openSettings, pinService, this.pinned);
    this.setService(service, this.serviceState); // generate Service
    this.annotation = new Annotation(service, serviceRadius, xMid, yMid, this.isSelfCompleting, this.procedure);
    this.action = new Action(service, serviceRadius, xMid, yMid, this.serviceState, setAction);
  }

  setService(snap: Snap.Paper, serviceStateTyp: string): void {
    const serviceState = serviceStateTyp;

    // Setup Service Circle
    this.serviceCircle = snap.circle(this.xMid, this.yMid, this.radius).attr({
      class: 'service unclicked_service',
    });
    this.serviceCircle.node.style.cursor = 'pointer';

    // add Icon
    this.iconSvg = snap.svg(this.xMid - 0.5 * this.iconScale, this.yMid - 0.5 * this.iconScale).attr({
      class: 'serviceIcon',
      viewBox: '0 0 24 24',
      width: 40,
      height: 40
    });
    this.iconSvg.node.style.transformOrigin = '50% 50%';
    this.iconSvg.node.style.pointerEvents = 'none';
    this.iconSvg.path(this.path); // set Path for Icon

    this.serviceStateText = snap.text(this.xMid, this.yMid - this.radius - 10, serviceState).attr({
      class: 'serviceState unclicked_service'
    });

    // Setup Service Name, Text under Service circle
    this.serviceNameText = snap.text(this.xMid, this.yMid + this.radius + 20, this.serviceName).attr({
      class: 'serviceName'
    });

    // Setup Service SVG
    const serviceGroup = snap.group(
      this.serviceCircle,
      this.iconSvg,
      this.serviceNameText,
      this.serviceStateText
    );

    // hover function for Service; If hovered show Service State; If not hovered hide Service State
    serviceGroup.hover(
      () => {
        if (!this.clickedService) {
          this.serviceStateText.attr({
            class: 'serviceState unclicked_service hover',
          });
        }
      },
      () => {
        if (!this.clickedService) {
          this.serviceStateText.attr({
            class: 'serviceState unclicked_service'
          });
        }
      }
    );

    /* click function for Service; If clicked show Actions and Flag,
     * time the clicks so drag n drop actions dont click it
     */

    // TODO choose correct event target
    const mousedown$ = fromEvent(document.getElementById('buttonDiv'), 'mousedown');

    const mouseup$ = fromEvent(document.getElementById('buttonDiv'), 'mouseup');

    mousedown$.subscribe(() => {
      const clickTimer$ = timer(200);
      mouseup$.pipe(takeUntil(clickTimer$)).subscribe(() => {
        if (this.clickedService) {
          this.unClickService();
          this.serviceStateText.attr({
            class: 'serviceState clicked_service'
          });
        } else {
          this.clickService();
        }
      });
    });
  }

  clickService(): void {
    this.annotation.clickService();
    this.action.clickService();
    this.flag.clickService();

    this.serviceCircle.attr({
      class: 'service clicked_service'
    });
    // snap.node.style.overflow = 'visible';

    // animate Circle
    this.serviceCircle.animate({
      r: this.radiusClicked
    }, 200, mina.easein(0));
    // animate Icon
    this.iconSvg.animate({
      x: this.xMid - 0.75 * this.iconScale,
      y: this.yMid - 0.75 * this.iconScale,
      height: 1.5 * this.iconScale,
      width: 1.5 * this.iconScale
    }, 200, mina.easein(0));

    // move Text
    this.serviceStateText.animate({
      transform: 'translate(115, -5)'
    }, 300);
    this.serviceStateText.attr({
      class: 'serviceState clicked_service'
    });
    this.serviceNameText.animate({
      transform: 'translate(115, 5)'
    }, 300);
    // make background visible
    this.background[0].style.display = 'block';
    const elements = Array.from(document.getElementsByClassName(this.serviceName) as HTMLCollectionOf<HTMLElement>);
    for (const item of elements) {
      item.style.zIndex = '4';
    }
    this.clickedService = true;
  }

  unClickService(): void {
    this.resetBackground();

    const elements = Array.from(document.getElementsByClassName(this.serviceName) as HTMLCollectionOf<HTMLElement>);
    for (const item of elements) {
      item.style.zIndex = '1';
    }

    this.annotation.unClickService();
    this.action.unclickService();
    this.flag.unClickService();

    this.serviceCircle.attr({
      class: 'service unclicked_service'
    });

    // animate Circle
    this.serviceCircle.animate({
      r: this.radius
    }, 200, mina.easein(0));
    // animate Icon
    this.iconSvg.animate({
      x: this.xMid - 0.5 * this.iconScale,
      y: this.yMid - 0.5 * this.iconScale,
      height: this.iconScale,
      width: this.iconScale
    }, 150, mina.easein(0));

    // move text
    this.serviceStateText.animate({
      transform: 'translate(0)'
    }, 30);
    this.serviceStateText.attr({
      class: 'serviceState unclicked_service'
    });
    this.serviceNameText.animate({
      transform: 'transform(0)'
    }, 30);

    // todo: z-Index

    this.clickedService = false;
    // test
  }

  resetBackground(): void {
    this.background[0].style.display = 'none';
  }
}
