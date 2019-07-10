import * as Snap from 'snapsvg-cjs';

export class Annotation {
    // Constance
    serviceRadius: number; // used for calculation of Annotation Position
    xMid: number; // MidPoint of Service
    yMid: number;
    radius = 12;

    // Variables for reuse in the methods
    upperAnnotationCircle;
    upperAnnotationText;
    lowerAnnotationCircle;
    lowerAnnotationText;

    constructor(annotation: Snap.Paper, serviceRadius, xMid, yMid) {
        // set Constance
        this.serviceRadius = serviceRadius;
        this.xMid = xMid;
        this.yMid = yMid;

        this.setAnnotation(annotation);
    }

    setAnnotation(snap: Snap.Paper) {

        // ----------- Set upper Annotation ------------------
        const upperAnnotationState = '?'; // ToDo: dynamic
        this.upperAnnotationCircle = snap.circle(
            this.xMid + this.serviceRadius / Math.sqrt(2),
            this.yMid - this.serviceRadius / Math.sqrt(2), this.radius
        ).attr({
            class: 'annotation'
        });
        this.upperAnnotationText = snap.text(this.xMid, this.yMid, upperAnnotationState).attr({
            class: 'annotationText upperAnnotation'
        });
        const xUpper = this.upperAnnotationCircle.getBBox().cx;
        const yUpper = this.upperAnnotationCircle.getBBox().cy;
        this.upperAnnotationText.attr({
            x: xUpper,
            y: yUpper
        });
        const upperAnnotationGroup = snap.group(
            this.upperAnnotationCircle,
            this.upperAnnotationText
        );

        // -------------- Set lower Annotation --------------------
        // toDo: prove, if StateChange
        const lowerAnnotationState = 'SC';
        this.lowerAnnotationCircle = snap.circle(
            this.xMid + this.serviceRadius / Math.sqrt(2),
            this.yMid + this.serviceRadius / Math.sqrt(2),
            this.radius
        ).attr({
            class: 'annotation'
        });
        this.lowerAnnotationText = snap.text(this.xMid, this.yMid, lowerAnnotationState).attr({
            class: 'annotationText lowerAnnotation'
        });
        const xLower = this.lowerAnnotationCircle.getBBox().x + this.lowerAnnotationCircle.getBBox().width / 2;
        const yLower = this.lowerAnnotationCircle.getBBox().y + this.lowerAnnotationCircle.getBBox().height / 2;
        this.lowerAnnotationText.attr({
            x: xLower,
            y: yLower
        });
        const lowerAnnnotationGroup = snap.group(
            this.lowerAnnotationCircle,
            this.lowerAnnotationText
        );
    }

    clickService() {
        this.upperAnnotationText.node.style.display = 'none';
        this.upperAnnotationCircle.node.style.display = 'none';

        // todo: prove if stateChange
        this.lowerAnnotationText.node.style.display = 'none';
        this.lowerAnnotationCircle.node.style.display = 'none';
    }

    unclickService() {
        this.upperAnnotationText.node.style.display = 'block';
        this.upperAnnotationCircle.node.style.display = 'block';

        // todo: prove if stateChange
        this.lowerAnnotationText.node.style.display = 'block';
        this.lowerAnnotationCircle.node.style.display = 'block';
    }
}
