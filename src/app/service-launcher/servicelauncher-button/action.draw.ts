import {EventEmitter} from '@angular/core';
import {Element} from 'snapsvg';
import * as Snap from 'snapsvg-cjs';
import {Icon} from './icon.draw';

export class Action {

    // Constance
    serviceRadius: number;
    xMid: number;
    yMid: number;
    actionCirclePercent = 0.84375;
    actionMidPointPercent = 2.625; // needed for calculation of MidPoint Action Circle
    actionRadius: number;
    actionMidPoint: number;
    iconScale = 40;

    actionArray: any[] = [];
    serviceMask: Element;
    maskedGroup: Element;

    constructor(action: Snap.Paper, serviceRadius: number, xMid: number, yMid: number, state: string,
                public setAction) {
        this.serviceRadius = serviceRadius;
        this.xMid = xMid;
        this.yMid = yMid;

        this.actionRadius = this.calculateActionRadius(serviceRadius);
        this.actionMidPoint = this.calculateActionMidPoint(serviceRadius);
        this.setActions(action, state);

    }

    setActions(snap: Snap.Paper, state: string): void {

        this.serviceMask = snap.circle(this.xMid, this.yMid, this.serviceRadius * 1.5);
        this.serviceMask.attr({
            fill: 'white'
        });
        this.maskedGroup = snap.group();
        this.maskedGroup.attr({
            mask: this.serviceMask
        });

        // todo: maybe add ActionArray

        switch (state) {
            case 'EXECUTE':
                this.setPause(snap);
                this.setStop(snap);
                this.setHold(snap);
                this.setAbort(snap);
                this.setStateChange(snap, 'COMPLETING');
                // todo: add restart
                break;
            case 'COMPLETED':
                this.setReset(snap);
                this.setAbort(snap);
                this.setStop(snap);
                break;
            case 'PAUSING':
                this.setAbort(snap);
                this.setStop(snap);
                this.setHold(snap);
                this.setStateChange(snap, 'PAUSED');
                break;
            case 'PAUSED':
                this.setAbort(snap);
                this.setStop(snap);
                this.setHold(snap);
                // todo: add resume
                break;
            case 'STOPPING':
                this.setAbort(snap);
                this.setStateChange(snap, 'STOPPED');
                break;
            case 'STOPPED':
                this.setAbort(snap);
                this.setReset(snap);
                break;
            case 'ABORTING':
                this.setStateChange(snap, 'ABORTED');
                break;
            case 'ABORTED':
                this.setReset(snap);
                break;
            case'HOLDING':
                this.setStop(snap);
                this.setAbort(snap);
                this.setStateChange(snap, 'HELD');
                break;
            case 'HELD':
                this.setStop(snap);
                this.setAbort(snap);
                // todo: add unhold
                break;
            case 'UNHOLDING':
                this.setStop(snap);
                this.setHold(snap);
                this.setAbort(snap);
                this.setStateChange(snap, 'EXECUTE');
                break;
            case 'IDLE':
                // todo: set active = false
                this.setStop(snap);
                this.setAbort(snap);
                this.setStart(snap);
                break;
            case 'RESETTING':
                this.setStart(snap);
                this.setAbort(snap);
                this.setStateChange(snap, 'IDLE');
                break;
            case 'STARTING':
                this.setStop(snap);
                this.setHold(snap);
                this.setAbort(snap);
                this.setStateChange(snap, 'EXECUTE');
                break;
            case 'RESUMING':
                this.setStop(snap);
                this.setHold(snap);
                this.setAbort(snap);
                this.setStateChange(snap, 'EXECUTE');
                break;
            case 'COMPLETING':
                this.setStop(snap);
                this.setHold(snap);
                this.setAbort(snap);
                this.setStateChange(snap, 'COMPLETED');
                break;
            default:
        }
    }

    setStateChange(snap: Snap.Paper, nextState: string): void {
        // create Circle for Action
        const stateChangeCircle = snap.circle(this.xMid, this.yMid + this.actionMidPoint, this.actionRadius).attr({
            class: 'action',
            opacity: 0.5
        });
        stateChangeCircle.node.style.cursor = 'auto';
        stateChangeCircle.transform('R330,' + this.xMid + ',' + this.yMid);

        const stateChangeIcon = snap.text(
            stateChangeCircle.getBBox().x + this.actionRadius,
            stateChangeCircle.getBBox().y + this.actionRadius, 'SC'
        ).attr({
            class: 'actionIcon',
            fontSize: 20
        });
        stateChangeIcon.node.style.transformOrigin = '50% 50%';
        stateChangeIcon.node.style.pointerEvents = 'none';

        // create Text for Action
        const capitalizedNextState = this.capitalizeFirstLetter(nextState);
        const stateChangeText = snap.text(this.xMid, this.yMid).attr({
            text: ['Statechange to', capitalizedNextState],
            class: 'actionText'
        });

        // set x and y for text
        let xText: number;
        let yText: number;
        stateChangeText.selectAll('tspan').forEach( (tspan, i) => {
            xText = stateChangeCircle.getBBox().x + this.actionRadius;
            yText = stateChangeCircle.getBBox().y + 2.0 * this.actionRadius + (i + 1) * 14;
            tspan.attr({
                x: xText,
                y: yText
            });
        }); // todo: Text is clipped

        const stateChangeGroup = snap.group(
            stateChangeCircle,
            stateChangeIcon,
            stateChangeText
        );

        this.maskedGroup.add(stateChangeGroup);

        stateChangeCircle.hover( () => {
            stateChangeText.attr({
                class: 'actionText hover'
            });
        },
        () => {
            stateChangeText.attr({
                class: 'actionText'
            });
        }).click(() => {this.emitAction('stateChange'); });
    }

    setStart(snap: Snap.Paper): void {

        // create Circle for Action
        const startCircle = snap.circle(this.xMid, this.yMid + this.actionMidPoint, this.actionRadius).attr({
            class: 'action'
        });
        startCircle.node.style.cursor = 'pointer';
        startCircle.transform('R10,' + this.xMid + ',' + this.yMid);

        // create Icon for Circle
        const startIcon = snap.svg(
            startCircle.getBBox().x + 0.2 * this.iconScale,
            startCircle.getBBox().y + this.actionRadius - 0.5 * this.iconScale
        ).attr({
            class: 'actionIcon',
            viewBox: '0 0 24 24',
            width: 40,
            height: 40
        });
        startIcon.path(Icon.getIcon('START')); // add Icon-Path
        startIcon.node.style.transformOrigin = '50% 50%';
        startIcon.node.style.pointerEvents = 'none';

        // create Text for Action
        const startText = snap.text(this.xMid, this.yMid, 'Start').attr({
            class: 'actionText'
        });

        // set x and y for Text
        const xText = startCircle.getBBox().x + this.actionRadius;
        const yText = startCircle.getBBox().y + 2 * this.actionRadius + 12;
        startText.attr({
            x: xText,
            y: yText
        });

        const startGroup = snap.group(
            startCircle,
            startIcon,
            startText
        );

        this.maskedGroup.add(startGroup);

        // hover function
        startCircle.hover(() => {
            startText.attr({
                class: 'actionText hover'
            });
        },
        () => {
            startText.attr({
                class: 'actionText'
            });
        }).click(() => {this.emitAction('start'); });
    }

    setPause(snap: Snap.Paper): void {
        // create Circle for Action
        const pauseCircle = snap.circle(this.xMid, this.yMid + this.actionMidPoint, this.actionRadius).attr({
            class: 'action'
        });
        pauseCircle.node.style.cursor = 'pointer';
        pauseCircle.transform('R50,' + this.xMid + ',' + this.yMid);

        // create Icon for Circle, ToDo: get Icon in the middle
        const xIcon = pauseCircle.getBBox().x + this.actionRadius - 0.5 * this.iconScale; // s Position of Icon
        const yIcon = pauseCircle.getBBox().y + this.actionRadius - 0.5 * this.iconScale; // y Position of Icon
        const pauseIcon = snap.svg(xIcon , yIcon).attr({
            class: 'actionIcon',
            viewBox: '0 0 24 24',
            width: 40,
            height: 40,
            textAnchor: 'middle',
            dominantBaseline: 'central'
        });
        pauseIcon.path(Icon.getIcon('PAUSE')); // add Icon-Path
        pauseIcon.node.style.transformOrigin = '50% 50%';
        pauseIcon.node.style.pointerEvents = 'none';

        // create Text for Action
        const pauseText = snap.text(this.xMid, this.yMid, 'Pause').attr({
            class: 'actionText'
        });

        // set x and y for Text
        const xText = pauseCircle.getBBox().x + 0.2 * this.actionRadius;
        const yText = pauseCircle.getBBox().y + 2.0 * this.actionRadius + 14;
        pauseText.attr({
            x: xText,
            y: yText
        });

        const pauseGroup = snap.group(
            pauseCircle,
            pauseIcon,
            pauseText
        );

        this.maskedGroup.add(pauseGroup);

        // hover function
        pauseCircle.hover(() => {
            pauseText.attr({
                class: 'actionText hover'
            });
        },
        () => {
            pauseText.attr({
                class: 'actionText'
            });
        }).click(() => {this.emitAction('PAUSE'); });
    }

    setStop(snap: Snap.Paper): void {
        // create Circle for Action
        const stopCircle = snap.circle(this.xMid, this.yMid + this.actionMidPoint, this.actionRadius).attr({
            class: 'action'
        });
        stopCircle.node.style.cursor = 'pointer';
        stopCircle.transform('R90,' + this.xMid + ',' + this.yMid);

        // create Icon for Circle, ToDo: get Icon in the middle
        const xIcon = stopCircle.getBBox().x + this.actionRadius - 0.5 * this.iconScale;
        const yIcon = stopCircle.getBBox().y + this.actionRadius - 0.5 * this.iconScale;
        const stopIcon = snap.svg(xIcon, yIcon).attr({
            class: 'actionIcon',
            viewBox: '0 0 24 24',
            width: 40,
            height: 40
        });
        stopIcon.path(Icon.getIcon('STOP')); // add Icon-Path
        stopIcon.node.style.transformOrigin = '50% 50%';
        stopIcon.node.style.pointerEvents = 'none';

        // create Text for Action
        const stopText = snap.text(this.xMid, this.yMid, 'Stop').attr({
            class: 'actionText'
        });

        // set x and y for Text
        const xText = stopCircle.getBBox().x + 0.2 * this.actionRadius;
        const yText = stopCircle.getBBox().y - 0.3 * 12;
        stopText.attr({
            x: xText,
            y: yText
        });

        const stopGroup = snap.group(
            stopCircle,
            stopIcon,
            stopText
        );

        this.maskedGroup.add(stopGroup);

        // hover function
        stopCircle.hover(() => {
            stopText.attr({
                class: 'actionText hover'
            });
        },
         () => {
            stopText.attr({
                class: 'actionText'
            });
        }).click(() => {this.emitAction('STOP'); });
    }

    setHold(snap: Snap.Paper): void {
        // create Circle for Action
        const holdCircle = snap.circle(this.xMid, this.yMid + this.actionMidPoint, this.actionRadius).attr({
            class: 'action'
        });
        holdCircle.node.style.cursor = 'pointer';
        holdCircle.transform('R130,' + this.xMid + ',' + this.yMid);

        // create Icon for Circle, ToDo: get Icon in the middle
        const xIcon = holdCircle.getBBox().x + this.actionRadius - 0.5 * this.iconScale;
        const yIcon = holdCircle.getBBox().y + this.actionRadius - 0.5 * this.iconScale;
        const holdIcon = snap.svg(xIcon, yIcon).attr({
            class: 'actionIcon',
            viewBox: '0 0 24 24',
            width: 40,
            height: 40
        });
        holdIcon.path(Icon.getIcon('HOLD')); // add Icon-Path
        holdIcon.node.style.transformOrigin = '50% 50%';
        holdIcon.node.style.pointerEvents = 'none';

        // create Text for Action
        const holdText = snap.text(this.xMid, this.yMid, 'Hold').attr({
            class: 'actionText'
        });

        // set x and y for Text
        const xText = holdCircle.getBBox().x + this.actionRadius;
        const yText = holdCircle.getBBox().y - 0.3 * 12;
        holdText.attr({
            x: xText,
            y: yText
        });

        const holdGroup = snap.group(
            holdCircle,
            holdIcon,
            holdText
        );

        this.maskedGroup.add(holdGroup);

        // hover function
        holdCircle.hover(() => {
            holdText.attr({
                class: 'actionText hover'
            });
        },
        () => {
            holdText.attr({
                class: 'actionText'
            });
        }).click(() => {this.emitAction('HOLD'); });
    }

    setAbort(snap: Snap.Paper): void {
        // create Circle for Action
        const abortCircle = snap.circle(this.xMid, this.yMid + this.actionMidPoint, this.actionRadius).attr({
            class: 'action'
        });
        abortCircle.node.style.cursor = 'pointer';
        abortCircle.transform('R170,' + this.xMid + ',' + this.yMid);

        // create Icon for Circle, ToDo: get Icon in the middle
        const xIcon = abortCircle.getBBox().x + this.actionRadius - 0.5 * this.iconScale;
        const yIcon = abortCircle.getBBox().y + this.actionRadius - 0.5 * this.iconScale;
        const abortIcon = snap.svg(xIcon, yIcon).attr({
            class: 'actionIcon',
            viewBox: '0 0 24 24',
            width: 40,
            height: 40
        });
        abortIcon.path(Icon.getIcon('ABORT')); // add Icon-Path
        abortIcon.node.style.transformOrigin = '50% 50%';
        abortIcon.node.style.pointerEvents = 'none';

        // create Text for Action
        const abortText = snap.text(this.xMid, this.yMid, 'Abort').attr({
            class: 'actionText'
        });

        // set x and y for Text
        const xText = abortCircle.getBBox().x + this.actionRadius;
        const yText = abortCircle.getBBox().y - 0.3 * 12;
        abortText.attr({
            x: xText,
            y: yText
        });

        const abortGroup = snap.group(
            abortCircle,
            abortIcon,
            abortText
        );

        this.maskedGroup.add(abortGroup);

        // hover function
        abortCircle.hover(
            () => {
                abortText.attr({
                    class: 'actionText hover'
                });
            },
            () => {
                abortText.attr({
                    class: 'actionText'
                });
            }
        ).click(() => {this.emitAction('ABORT'); });
    }

    setReset(snap: Snap.Paper): void {
        // create Circle for Action
        const resetCircle = snap.circle(this.xMid, this.yMid + this.actionMidPoint, this.actionRadius).attr({
            class: 'action'
        });
        resetCircle.node.style.cursor = 'pointer';
        resetCircle.transform('R210,' + this.xMid + ',' + this.yMid);

        // create Icon for Circle, ToDo: get Icon in the middle
        const xIcon = resetCircle.getBBox().x + this.actionRadius - 0.5 * this.iconScale;
        const yIcon = resetCircle.getBBox().y + this.actionRadius - 0.5 * this.iconScale;
        const resetIcon = snap.svg(xIcon, yIcon).attr({
            class: 'actionIcon',
            viewBox: '0 0 24 24',
            width: 40,
            height: 40
        });
        resetIcon.path(Icon.getIcon('RESET')); // add Icon-Path
        resetIcon.node.style.transformOrigin = '50% 50%';
        resetIcon.node.style.pointerEvents = 'none';

        // create Text for Action
        const resetText = snap.text(this.xMid, this.yMid, 'Reset').attr({
            class: 'actionText'
        });

        // set x and y for Text
        const xText = resetCircle.getBBox().x + this.actionRadius;
        const yText = resetCircle.getBBox().y - 0.3 * 12;
        resetText.attr({
            x: xText,
            y: yText
        });

        const resetGroup = snap.group(
            resetCircle,
            resetIcon,
            resetText
        );

        this.maskedGroup.add(resetGroup);

        // hover function
        resetCircle.hover(() => {
            resetText.attr({
                class: 'actionText hover'
            });
        },
        () => {
            resetText.attr({
                class: 'actionText'
            });
        }).click(() => {this.emitAction('RESET'); });
    }

    calculateActionRadius(serviceRadius: number): number {
        return serviceRadius * this.actionCirclePercent;
    }

    calculateActionMidPoint(serviceRadius: number): number {
        return serviceRadius * this.actionMidPointPercent;
    }

    capitalizeFirstLetter(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    clickService(): void {
        setTimeout( () => {
            this.serviceMask.animate({
                r: this.serviceRadius + this.actionRadius + this.actionMidPoint
            }, 1);
        }, 30);

        for (const i of this.actionArray) {
            if (i !== undefined) {
                // todo: make Action clickable;
            }
        }
    }

    unclickService(): void {
        this.serviceMask.animate({
            r: this.serviceRadius
        }, 1);

        // todo: make Actions unclickable
    }

    // todo
    makeClickable(circle: Snap.Paper): void {
        circle.node.style.pointerEvents = 'auto';
    }

    // todo
    makeUnClickable(circle: Snap.Paper): void {
        circle.node.style.pointerEvents = 'none';
    }

    emitAction(action: string): void {
        // console.log('action',action)
        if (action) {
            this.setAction.emit(action);
        }
    }
}
