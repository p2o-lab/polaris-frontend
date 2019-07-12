import {MatDialog} from '@angular/material';
import {ServiceInterface} from '@p2olab/polaris-interface';
import * as Snap from 'snapsvg-cjs';
import {Icon} from './icon.draw';

export class Flag {
    // Constance
    infoLength: number = 200; // todo: set dynamic
    infoHeight: number;
    infoRadius: number;
    serviceRadius: number;
    xMid: number;
    yMid: number;
    infoFlagMovement: number = 175; // in px

    strategyName: string;
    operationMode: string;

    // Variables
    infoMask;
    infoFlag;
    infoGround;
    servicePinned;

    background;

    // dialog
    // dialog: MatDialog;

    constructor(
        flag: Snap.Paper,
        serviceRadius,
        xMid,
        yMid,
        public currentService: ServiceInterface,
        public dialog: MatDialog,
        public openService,
        public pinServiceEmitter,
        public pinned) {

        this.background = document.getElementsByClassName('background');

        // todo: get strategyName and OperationMode dynamic
        this.strategyName = currentService.currentStrategy;
        this.operationMode = currentService.opMode.source + ' ' + currentService.opMode.state;

        this.infoHeight = 2.4 * serviceRadius;
        this.infoRadius = 0.5 * this.infoHeight;
        this.serviceRadius = serviceRadius;
        this.xMid = xMid;
        this.yMid = yMid;

        this.setFlag(flag);
        this.servicePinned = pinned;
    }

    setFlag(snap: Snap.Paper) {

                // var array = JSON.parse(localStorage.getItem("pinned"));
                // if(array.includes(this.currentService.id))
                //     this.pinned = true;
                // else
                //     this.pinned = false;

        // Mask to hide flag when not clicked
        this.infoMask = snap.rect(120, 0, 200, 190).attr({
            fill: 'white'
        });
        this.infoFlag = snap.group().attr({
            mask: this.infoMask
        });
        this.infoFlag.node.style.pointerEvents = 'none'; // infoFlag is not clickable

        this.infoGround = snap.rect(
            this.xMid - this.infoLength,
            this.yMid - this.infoRadius, this.infoLength, this.infoHeight, this.infoRadius).attr(
                {class: 'flag'
        });
        this.infoFlag.add(this.infoGround);

        /*
        // mask to hide flag when not clicked
        const infoMask = snap.rect(120, 0, 190, 190).attr({
           fill: 'white'
        }); */

        const infoBBox = this.infoGround.getBBox();

        const flagCircleRadius = 12 * 0.8;
        const settingsRadius = this.infoRadius * 0.5;
        const xWarn = infoBBox.x + 0.6 * infoBBox.width; // Position of Warining Circle
        const yWarn = infoBBox.y + 0.27 * infoBBox.height;
        const xAlert = infoBBox.x + 0.45 * infoBBox.width; // Position of Alert Circle
        const yAlert = yWarn;
        const xPin = infoBBox.x + 0.83 * infoBBox.width;
        const yPin = yWarn;
        const xStrategy = xAlert - flagCircleRadius;
        const yStrategy = infoBBox.y + 0.60 * infoBBox.height;
        const xOpMode = xStrategy;
        const yOpMode = infoBBox.y + 0.8 * infoBBox.height;
        const xSettings = infoBBox.x + infoBBox.width + (Math.sqrt(2) / 2 - 1) * this.infoRadius;
        const ySettings = infoBBox.y + infoBBox.height + (Math.sqrt(2) / 2 - 1) * this.infoRadius;

        this.addWarn(snap, xWarn, yWarn, flagCircleRadius);
        this.addAlert(snap, xAlert, yAlert, flagCircleRadius);
        this.addPin(snap, xPin, yPin, flagCircleRadius);
        this.addSettingButton(snap, xSettings, ySettings, settingsRadius);

        const strategyText = snap.text(xStrategy, yStrategy, this.strategyName).attr({
            class: 'flagStrategyText'
        });
        const operationModeText = snap.text(xOpMode, yOpMode, this.operationMode).attr({
            class: 'flagOperationModeText'
        });

        this.infoFlag.add(strategyText);
        this.infoFlag.add(operationModeText);
    }

    addWarn(snap: Snap.Paper, xWarn, yWarn, flagCircleRadius) {
        const warnCircle = snap.circle(xWarn, yWarn, flagCircleRadius).attr({
            class: 'flagWarnCircle'
        });

        // position for text in circle
        const xWarnText = warnCircle.getBBox().x + warnCircle.getBBox().width / 2;
        const yWarnText = warnCircle.getBBox().y + warnCircle.getBBox().height / 2;
        // todo: get number of Warnings dynamic
        const warnText = snap.text(this.xMid, this.yMid, '2').attr({
            class: 'flagWarnText',
            x: xWarnText,
            y: yWarnText
        });

        const warnGroup = snap.group(
            warnCircle,
            warnText
        );

        this.infoFlag.add(warnGroup);

    }

    addAlert(snap: Snap.Paper, xAlert, yAlert, flagCircleRadius) {
        const alertCircle = snap.circle(xAlert, yAlert, flagCircleRadius).attr({
            class: 'flagAlertCircle'
        });

        // position for Text in Circle
        const xAlertText = alertCircle.getBBox().x + alertCircle.getBBox().width / 2;
        const yAlertText = alertCircle.getBBox().y + alertCircle.getBBox().height / 2;

        const alertText = snap.text(this.xMid, this.yMid, '3').attr({
            class: 'flagAlertText',
            x: xAlertText,
            y: yAlertText
        });

        const alertGroup = snap.group(
            alertCircle,
            alertText
        );

        this.infoFlag.add(alertGroup);
    }

    addPin(snap: Snap.Paper, xPin, yPin, flagCircleRadius) {
        const pinCircle = snap.circle(xPin, yPin, flagCircleRadius).attr({
            class: 'flagPinCircle'
        });

        const iconScale = 0.8 * pinCircle.getBBox().width;
        const xPinIcon = xPin - 0.5 * iconScale; // x-Position of Pin Icon
        const yPinIcon = yPin - 0.5 * iconScale;

        // todo: add pin function

        const pinIcon = snap.svg(xPinIcon, yPinIcon).attr({
            viewBox: '0 0 24 24',
            width: iconScale,
            height: iconScale
        });
        pinIcon.node.style.transformOrigin = '50% 50%';
        pinIcon.node.style.pointerEvents = 'none';

        if (!this.pinned) {
            pinIcon.path(Icon.getIcon('pinOff'));
            pinIcon.attr({
                class: 'pinIconOff'
            });
        } else {
            pinIcon.path(Icon.getIcon('pinOn'));
            pinIcon.attr({
                    class: 'pinIconOn'
                });
            pinCircle.attr({
                    class: 'flagPinCircle pinned'
                });
        }

        pinCircle.click(() => {
            pinIcon.clear();
            if (this.pinned) {
                this.resetBackground();
                this.pinned = false;
                pinIcon.path(Icon.getIcon('pinOff'));
                pinIcon.attr({
                    class: 'pinIconOff'
                });
                pinCircle.attr({
                    class: 'flagPinCircle'
                });

                this.pinned = false;
            } else {
                this.resetBackground();
                this.pinned = true;
                pinIcon.path(Icon.getIcon('pinOn'));
                pinIcon.attr({
                    class: 'pinIconOn'
                });
                pinCircle.attr({
                    class: 'flagPinCircle pinned'
                });

                this.pinned = true;
            }
            this.pinService();
        });

        const pinGroup = snap.group(
            pinCircle,
            pinIcon
        );

        this.infoFlag.add(pinGroup);
    }
    addSettingButton(snap: Snap.Paper, xSettings, ySettings, settingeRadius) {

        const settingsCircle = snap.circle(xSettings, ySettings, settingeRadius).attr({
            class: 'settingsButton'
        });

        const iconScale = 0.9 * settingsCircle.getBBox().width;
        const xSettingsIcon = xSettings - 0.5 * iconScale;
        const ySettingsIcon = ySettings - 0.5 * iconScale;

        const settingsIcon = snap.svg(
            xSettings - 0.5 * 0.9 * settingsCircle.getBBox().width,
            ySettings - 0.5 * 0.9 * settingsCircle.getBBox().width).attr(
                {
                    class: 'settingsIcon',
                    viewBox: '0 0 24 24',
                    width: iconScale,
                    height: iconScale,
        });
        settingsIcon.path(Icon.getIcon('settings'));
        settingsIcon.node.style.transformOrigin = '50% 50%';
        settingsIcon.node.style.pointerEvents = 'none';

        const settingsGroup = snap.group(
            settingsCircle,
            settingsIcon
        );

        this.infoFlag.add(settingsGroup);

        // todo: show modal wehn settings button is clicked

        settingsCircle.click( () => {
            this.openSettings();
        });
    }

    clickService() {
        this.infoFlag.attr({
            display: 'block'
        });

        this.infoMask.animate({
            transform: 'translate(-' + this.infoFlagMovement + ')'
        }, 275);
        this.infoFlag.animate({
            transform: 'translate(' + this.infoFlagMovement + ')'
        }, 275);
    }

    unclickService() {
        this.infoFlag.attr({
            display: 'none'
        });
        this.infoMask.animate({
            transform: 'translate(0)'
        }, 30);
        this.infoFlag.animate({
            transform: 'translate(0)'
        }, 30);
    }

    openSettings() {
        // this.dialog.open(ServiceSettingsComponent);
        this.openService.emit(this.currentService);
        // todo: handle parameters
    }
    pinService() {
        this.pinServiceEmitter.emit(this.currentService);
    }
    resetBackground() {
        this.background[0].style.display = 'none';
    }
}
