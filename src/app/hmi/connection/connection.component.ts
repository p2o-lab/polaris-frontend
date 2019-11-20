import {Component, Input} from '@angular/core';
import {ElkExtendedEdge} from 'elkjs';

@Component({
    selector: '[app-connection]',
    templateUrl: './connection.component.svg',
    styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {

    public get path(): string {
        return this.transformElkSectionsToSvgPath();
    }
    @Input() private edge: ElkExtendedEdge;

    private transformElkSectionsToSvgPath(): string {
        if (this.edge.sections) {
            const startPoint = this.edge.sections[0].startPoint;
            const endPoint = this.edge.sections[0].endPoint;

            let bb = '';
            if (this.edge.sections[0].bendPoints) {
                const bendPoints = this.edge.sections[0].bendPoints;
                bb = bendPoints ? bendPoints.reduce((acc, data) => acc + ' ' + data.x + ',' + data.y, '') : '';
            }
            return `M ${startPoint.x},${startPoint.y} ${bb}
        ${endPoint.x},${endPoint.y} `;
        } else {
            return '';
        }
    }

}
