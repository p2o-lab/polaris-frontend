import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild, } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import * as Snap from 'snapsvg-cjs';
// models
import { Subplant } from '../../../models/subplant.model';
import { Connection } from '../../../models/connection.model';

@Component({
    selector: 'app-nav-shopfloor',
    templateUrl: './shopfloor.component.html',
    styleUrls: ['./shopfloor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopfloorComponent implements OnInit {

    @Input() subplants: Dictionary<Subplant>;
    @Output() subplantSelection = new EventEmitter<string>();
    @ViewChild('svgShopfloor') svg;
    test: string;

    constructor() {
    }

    ngOnInit() {
        const paper = Snap(this.svg.nativeElement);
        this.drawGrid(paper, this.subplants, null);
    }


    /**
     * Main drawing function
     * @param {Snap.Paper} svg - Snap SVG Paper on which shopfloor is drawn
     * @param {Subplant[]} subplants - Array of subplants
     * @param {Connection[]} connections - Array of subplant connections
     */
    drawGrid(svg: Snap.Paper, subplants: Dictionary<Subplant>, connections: Connection[]) {
        // TODO: connections auswerten
        connections = null;

        // clear grid for drawing
        svg.clear();

        // calculate dimensions
        // init to find max/min r/c
        let lowestr = 10000;
        let lowestc = 10000;
        let largestr = -10000;
        let largestc = -10000;

        // for all subplants
        Object.entries(subplants).forEach(([key, subplant]) => {

            if (lowestr > subplant.r) {
                lowestr = subplant.r;
            }
            if (lowestc > subplant.c) {
                lowestc = subplant.c;
            }
            if (largestr < subplant.r) {
                largestr = subplant.r;
            }
            if (largestc < subplant.c) {
                largestc = subplant.c;
            }
        });


        if (connections != null) {
            // for each connection
            connections.forEach(function (connect) {
                connect.path.forEach(function (path) {
                    if (lowestr > path.r) {
                        lowestr = path.r;
                    }
                    if (lowestc > path.c) {
                        lowestc = path.c;
                    }
                    if (largestr < path.r) {
                        largestr = path.r;
                    }
                    if (largestc < path.c) {
                        largestc = path.c;
                    }
                });
            });

        }

        // set viewbox
        if ((lowestc <= largestc) && (lowestr <= largestr)) {
            const xStart = (100 * (lowestc - 1) - 50);
            const yStart = (100 * (lowestr - 1) - 50);
            const xEnd = (100 * (largestc - lowestc + 1) + 100);
            const yEnd = (100 * (largestr - lowestr + 1) + 100);

            svg.attr({viewBox: xStart + ' ' + yStart + ' ' + xEnd + ' ' + yEnd});
        }

        // ******************
        // subplants
        // ******************
        const allSubplants = [];

        Object.entries(subplants).forEach(([key, subplant]) => {

            // helper functions
            const changeLevel = (): void => {
                this.selectSubplant(subplant);
            };

            // ****************************************************************************************************
            // create one group per subplant, put the box and the title in it
            // ****************************************************************************************************
            // subplant positions from json
            const boxX = (subplant.c - 1) * 100,
                boxY = (subplant.r - 1) * 100;

            const g = svg.group(
                svg.circle(boxX + 50, boxY + 50, 50)
                    .attr({id: subplant.id + '_box', class: 'subplant inactive_box'}),
                svg.text(boxX + 50, boxY + 120, subplant.name)
                    .attr({id: subplant.id + '_title', class: 'title'})
            ).attr({id: subplant.id, class: 'subplant'})
                .click(changeLevel);

            allSubplants.push(g);
        });
    }

    // helper functions
    selectSubplant(subplant: Subplant): void {
        console.log(`Selected Subplant: ${subplant.name}`);
        this.subplantSelection.emit(subplant.id);
    }
}
