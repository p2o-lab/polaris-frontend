import {ServiceInterface} from '@p2olab/polaris-interface';
import * as Snap from 'snapsvg-cjs';

import {MatDialog} from '@angular/material';
import {Action} from './action.draw';
import {Annotation} from './annotation.draw';
import {Flag} from './flag.draw';
import { Icon } from './icon.draw';

declare var mina: any;

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
    iconScale: number = 40;
    background: any;
    serviceLauncherDiv: any;

    // variables for current Service
    serviceName: string;
    serviceState: string;
    serviceDiv: any;
    pinned: boolean;
    sc: boolean = false;
    strategy: string = '';

    // Variables for reuse in the methodes
    clickedService: boolean; // true, if Service is clicked
    serviceCircle: Snap.Paper; // Circle of Service
    iconSvg: Snap.Paper; // Icon of Service
    serviceStateText: Snap.Paper; // Shows Service State
    serviceNameText: Snap.Paper; // Shows Name of Service

    constructor(
        service: Snap.Paper,
        serviceRadius,
        xMid,
        yMid,
        currentService: ServiceInterface,
        dialog: MatDialog,
        openSettings,
        pinService,
        setAction) {
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

        // get current strategy id & sc for drawing
        currentService.strategies.forEach((currValue, i) => {
          if (currValue.name === currentService.currentStrategy) {
            this.strategy = currValue.id;
            this.sc = currValue.sc;
          }
        });

        // add all SVGs
        // generate flag for Service
        this.flag = new Flag(service, serviceRadius, xMid, yMid, currentService,
          dialog, openSettings, pinService, this.pinned);
        this.setService(service, this.serviceState); // generate Service
        this.annotation = new Annotation(service, serviceRadius, xMid, yMid, this.sc, this.strategy);
        this.action = new Action(service, serviceRadius, xMid, yMid, this.serviceState, setAction);
    }

    setService(snap: Snap.Paper, serviceStateTyp) {
        // set Constance. Is nessecary because snap can not use global variables
        const radius = this.radius;
        const clickedServiceRadius = this.radiusClicked;

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

        // hover function for Service; If hoverd show Service State; If not hoverd hide Service State
        serviceGroup.hover(
            () => {
                if (! this.clickedService) {
                    this.serviceStateText.attr({
                        class: 'serviceState unclicked_service hover',
                    });
                }
            },
            () => {
                if (! this.clickedService) {
                    this.serviceStateText.attr({
                        class: 'serviceState unclicked_service'
                    });
                }
            }
        );

        // click function for Service; If clicked show Actions and Flag
        this.serviceCircle.click(() => {
            if (this.clickedService) {
                this.unclickService();
                this.serviceStateText.attr({
                    class: 'serviceState clicked_service'
                });
            } else {
                this.clickService(snap);
            }
        });
    }

    clickService(snap: Snap.Paper) {
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

    unclickService() {
       this.resetBackground();

       const elements = Array.from(document.getElementsByClassName(this.serviceName) as HTMLCollectionOf<HTMLElement>);
       for (const item of elements) {
         item.style.zIndex = '1';
       }

       this.annotation.unclickService();
       this.action.unclickService();
       this.flag.unclickService();

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

    resetBackground() {
        this.background[0].style.display = 'none';
    }
}
