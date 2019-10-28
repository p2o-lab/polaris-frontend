import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: '[app-connection]',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

    public path;
    private _edge;

    @Input()
    set edge(edge: any) {
        this._edge = edge;

        if (edge.sections) {
            const startPoint = edge.sections[0].startPoint;
            const endPoint = edge.sections[0].endPoint;

            let bb = '';
            if (edge.sections[0].bendPoints) {
                const bendPoints = edge.sections[0].bendPoints;
                bb = bendPoints ? bendPoints.reduce((acc, data) => acc + ' ' + data.x + ',' + data.y, '') : '';
            }
            this.path = `M ${startPoint.x},${startPoint.y} ${bb}
        ${endPoint.x},${endPoint.y} `;
        }

    }


    constructor() {
    }

    ngOnInit() {
    }

}
