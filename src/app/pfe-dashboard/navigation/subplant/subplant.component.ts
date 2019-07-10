import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import * as Snap from 'snapsvg-cjs';
// models
import { Module } from '../../../models/module.model';
import { CurrentSelection } from '../../../models/current-selection.model';
import { Connection } from '../../../models/connection.model';
import { Port } from '../../../models/port.model';


@Component({
    selector: 'app-nav-subplant',
    template: `
        <svg #svgSubplant width="100%" height="100%" preserveAspectRatio="xMidYMid meet"></svg>
    `,
    styleUrls: ['./subplant.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubplantComponent implements OnInit, OnChanges {

    @Input() modules: Dictionary<Module>;
    @Input() ports: Dictionary<Port>;
    @Input() connection: Connection[];
    @Input() currentSelection: CurrentSelection;

    @Output() userSelection = new EventEmitter<{modules: String[], jump: Boolean}>();

    @ViewChild('svgSubplant') svg;


    private drawnModules = new Map<string, any>();


    constructor() {
    }

    ngOnInit() {
        const svg = Snap(this.svg.nativeElement);
        this.drawSubplant(svg, this.modules, this.connection, this.ports);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentSelection']) {
            // set colors to active / inactive boxes
            this.drawSelection();
        }
    }

    /**
     *
     * @param svg
     * @param modules
     * @param connections
     */
    drawSubplant(svg: Snap.Paper, modules: Dictionary<Module>, connections: Connection[], ports: Dictionary<Port>) {
        // clear grid for drawing
        svg.clear();

        // ************************************************************************************
        // define drawing parameter
        // ************************************************************************************
        const con_block_height = 50;
        const con_block_width = 100;
        const mod_block_height = 100;
        const mod_block_width = 100;
        const mod_con_padding = 15;

        // ************************************************************************************
        // find the border from json
        // ************************************************************************************

        // init to find max/min r/c
        let lowestr = 10000;
        let lowestc = 10000;
        let largestr = -10000;
        let largestc = -10000;


        // for all modules
        Object.entries(modules).forEach(([key, module]) => {

            if (lowestr > module.r) {
                lowestr = module.r;
            }
            if (lowestc > module.c) {
                lowestc = module.c;
            }
            if (largestr < module.r) {
                largestr = module.r;
            }
            if (largestc < module.c) {
                largestc = module.c;
            }
        });

        if (connections) {
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

        // remove excel grid offset
        lowestr -= 1;
        lowestc -= 1;
        largestr -= 1;
        largestc -= 1;

        // ************
        // set the viewbox
        // *************

        if ((lowestc <= largestc) && (lowestr <= largestr)) {
            const xStart = Math.floor(lowestc / 2) * (mod_block_width + con_block_width) + (lowestc % 2) * con_block_width;
            const yStart = Math.floor(lowestr / 2) * (mod_block_height + con_block_height) + (lowestr % 2) * con_block_height;
            const xEnd = Math.floor((largestc - lowestc) / 2) * (mod_block_width + con_block_width) +
                (1 - lowestc % 2) * con_block_width + (lowestc % 2) * mod_block_width;
            const yEnd = Math.floor((largestr - lowestr) / 2) * (mod_block_height + con_block_height) +
                (1 - lowestr % 2) * con_block_height + (lowestr % 2) * mod_block_height;

            svg.attr({viewBox: xStart + ' ' + yStart + ' ' + xEnd + ' ' + yEnd});
        }


        // setup reset function
        svg.click(() => {
            this.resetSelection();
        });

        // ******************
        // modules
        // ******************
        const allModules = [];
        let activeModules = [];
        const multipleSelection = false;


        Object.entries(modules).forEach(([key, module])  => {

            // ************************************************************
            // broadcast the active Modul and change the css-class
            // ************************************************************

            const addModule = (event) => {
                event.stopPropagation();
                if ((event.shiftKey) || (multipleSelection)) {   // falls Shift Key auch gedrückt wurde
                    if (this.currentSelection.selModules.includes(module.id)) {
                        this.removeModuleFromSelection(module);
                    } else {
                        this.addModuleToSelection(module);
                    }
                } else {
                    // creates an empty array and adds only one module
                    this.newSelection(module);
                }
            };


            // ************************************************************
            // broadcast level change for detail
            // ************************************************************

            const singleModule = () => {
                this.jumpViewLevel(module);
            };


            // *******************************************************************
            // listener for long
            // *******************************************************************

            let timer;

            function down() {
                timer = setTimeout(onlongtouch, 1000);
            }

            function up() {
                // stops short touches from firing the event
                if (timer) {
                    clearTimeout(timer); // clearTimeout, not cleartimeout..
                    activeModules = [];
                    activeModules.push(module);
                    // $rootScope.$broadcast('activeModules', activeModules);
                }

            }

            function onlongtouch() {
                timer = undefined;
                // addModule();
                // $rootScope.$broadcast('activeModules', activeModules);
            }




            // ****************************************************************************************************
            // create one group per module, put the box and the title in it
            // ****************************************************************************************************

            // module positions from json
            const boxX = calcX(module.c - 1),
                boxY = calcY(module.r - 1);

            const g = svg.group(
                svg.group(
                    svg.rect(boxX, boxY, mod_block_height, mod_block_width)
                        .attr({id: module.id + '_box', class: 'module_box inactive_box'}),
                    svg.text(10 + boxX, boxY + 90, module.id)
                        .attr({id: module.id + '_title', class: 'mod_name'})
                ).attr({class: 'module_hover_group'})
            ).attr({id: module.id, class: 'module'})
                .click(addModule)
                .dblclick(singleModule);
            /*
                               .touchstart(down)
                               .touchend(up);*/

            if (!module.com_init) {
                g.append(
                    svg.group(
                        svg.line(boxX, boxY, boxX + mod_block_width, boxY + mod_block_height),
                        svg.line(boxX, boxY + mod_block_height, boxX + mod_block_width, boxY),
                    ).attr({class: 'mod_unavailable'})
                );
            }

            this.drawnModules.set(module.id, g);


            // ************
            // add ports
            // ************

            // ---- inputs
            module.inputPorts.forEach((id, i) => {
                // create port title, spread it correctly over the length of the box & turn it
                const port = ports[id];
                const portCount = module.inputPorts.length - 1;
                const offset = (portCount > 0) ? ((mod_block_height - 2 * mod_con_padding) / portCount) : 0;

                const t = g.text(boxX + 5,
                    boxY + mod_con_padding + i * offset,
                    port.id)
                    .attr({id: port + '_title', class: 'port_title', opacity: 0})
                    .transform('r45,t-60,30');

                const easeOut = function () {
                    Snap.animate(1, 0, function (value) {
                        t.attr({opacity: value});
                    }, 500, null);
                };

                const easeIn = function () {
                    Snap.animate(0, 1, function (value) {
                        t.attr({opacity: value});
                    }, 500, null);

                    // hide title after view seconds
                    setTimeout(() => easeOut(), 4000);
                };

                // create port symbol & spread it correctly over the length of the box
                g.circle(boxX,
                    boxY + mod_con_padding + i * offset,
                    5)
                    .attr({id: port, class: 'port'})
                    // let the text appear
                    .click(easeIn);

            });

            // ---- outputs
            module.outputPorts.forEach((id, i) => {
                // create port title, spread it correctly over the length of the box & turn it
                const port: Port = ports[id];
                const portCount = module.outputPorts.length - 1;
                const offset = (portCount > 0) ? ((mod_block_height - 2 * mod_con_padding) / portCount) : 0;


                const t = g.text(boxX + 100 + 5,
                    boxY + mod_con_padding + i * offset,
                    port.id)
                    .attr({id: port + '_title', class: 'port_title', opacity: 0})
                    .transform('r-45,t15,-20');
                const easeIn = function () {
                    Snap.animate(0, 1, function (value) {
                        t.attr({opacity: value});
                    }, 1000, null);
                };
                // create port symbol & spread it correctly over the length of the box
                g.circle(boxX + 100,
                    boxY + mod_con_padding + i * offset
                    , 5)
                    .attr({id: port, class: 'port'})
                    // let the text appear
                    .click(easeIn);
            });


            // ************
            // add connections
            // ************
            const h = con_block_height;
            const w = con_block_width;

            if (connections) {
                connections.forEach((connection) => {

                    const start = findModuleFromOutput(connection.start);
                    const target = findModuleFromInput(connection.target);

                    // iterate through each path element
                    connection.path.forEach((path, i) => {
                        const r = path.r - 1;
                        const c = path.c - 1;
                        let dy;

                        // end of connection
                        if (i === connection.path.length - 1) {
                            let iport = 0;
                            const portCount = target.inputPorts.length - 1;
                            target.inputPorts.forEach((input, j) => {
                                if (target.inputPorts.indexOf(connection.target) !== -1) {
                                    iport = target.inputPorts.indexOf(connection.target);
                                }
                            });

                            const offset = (portCount > 0) ? ((mod_block_height - 2 * mod_con_padding) / portCount) : 0;
                            dy = mod_con_padding + (iport) * offset;

                            if (i === 0) {
                                svg.line(calcX(c, 0.5), calcY(r) + dy, calcX(c + 1), calcY(r) + dy).attr({class: 'connection'});
                            } else {
                                // if path has more than one element
                                svg.polyline(
                                    calcX(c + 1), calcY(r) + dy,
                                    calcX(c, 0.5), calcY(r) + dy,
                                    calcX(c, 0.5), calcY(connection.path[i - 1].r - 1) + con_block_height / 2
                                ).attr({class: 'connection'});

                            }
                        }

                        // start of connection
                        if (i === 0) {
                            let iport = 0;
                            const portCount = start.outputPorts.length - 1;
                            start.outputPorts.forEach((output, j) => {
                                if (start.outputPorts.indexOf(connection.start) !== -1) {
                                    iport = start.outputPorts.indexOf(connection.start);
                                }
                            });

                            const offset = (portCount > 0) ? ((mod_block_height - 2 * mod_con_padding) / portCount) : 0;
                            const dyn = mod_con_padding + iport * offset;

                            if (i === connection.path.length - 1) {
                                // path with single element
                                svg.polyline(
                                    calcX(c), calcY(r) + dyn,
                                    calcX(c, 0.3), calcY(r) + dyn,
                                    calcX(c, 0.3), calcY(r) + dy,
                                    calcX(c, 0.5), calcY(r) + dy
                                ).attr({class: 'connection'});
                            } else {
                                // path with multiple parts
                                svg.polyline(
                                    calcX(c), calcY(r) + dyn,
                                    calcX(c, 0.5), calcY(r) + dyn,
                                    calcX(c, 0.5) + h / 2 * (connection.path[i + 1].c - c - 1),
                                    calcY(connection.path[i + 1].r - 1) + con_block_height / 2
                                ).attr({class: 'connection'});

                            }
                        }

                        // middle path piece
                        if ((i > 0) && (i < connection.path.length - 1)) {
                            svg.polyline(
                                calcX(c, 0.5) + w / 2 * (connection.path[i - 1].c - (c + 1)),
                                calcY(r, 0.5) + h / 2 * (connection.path[i - 1].r - (r + 1)),
                                calcX(c, 0.5), calcY(r, 0.5),
                                calcX(c, 0.5) + w / 2 * (connection.path[i + 1].c - (c + 1)),
                                calcY(r, 0.5) + h / 2 * (connection.path[i + 1].r - (r + 1))
                            ).attr({class: 'connection'});

                        }
                    });
                });
            }

        });

        // ********************************************
        // Helper Functions
        // ********************************************
        function findModuleFromInput(input) {
            let back;
            Object.entries(modules).forEach(function ([key, module]) {
                module.inputPorts.forEach((modin) => {
                    if (module.inputPorts.includes(input)) {
                        back = module;
                    }
                });
            });
            return back;
        }

        function findModuleFromOutput(output) {
            let back;
            Object.entries(modules).forEach(function ([key, module]) {
                module.outputPorts.forEach((modout) => {
                    if (module.outputPorts.includes(output)) {
                        back = module;
                    }
                });
            });
            return back;
        }


        /**
         * Calculates the x coordinate for svg based on column index from  excel template
         * @param {number} columnIndex - column index in excel file
         * @param {number} offset - offset multiplier (needs to be between 0 and 1)
         * @returns {number}
         */
        function calcX(columnIndex, offset = 0) {
            return calcCord(columnIndex, mod_block_width, con_block_width, offset);
        }

        /**
         * Calculates the y coordinate for svg based on row number from excel template
         * @param {number} rowIndex - row number in excel grid
         * @param {number} offset - offset multiplier (needs to be between 0 and 1)
         * @returns {number}
         */
        function calcY(rowIndex, offset = 0) {
            return calcCord(rowIndex, mod_block_height, con_block_height, offset);
        }

        /**
         * Calculates the x or y coordinate in svg base on grid coordinate and block
         * @param {number} gridCord - grid coordinate (row / column) from excel template
         * @param {number} offset - offset multiplier (needs to be between 0 and 1)
         * @param {number} lengthMod - length of module block
         * @param {number} lengthCon - length of connection block
         * @returns {number} - x or y coordinate
         */
        function calcCord(gridCord, lengthMod, lengthCon, offset = 0) {
            let res = (Math.floor(gridCord / 2) * (lengthMod + lengthCon) + (gridCord % 2) * lengthCon);

            if (offset > 0 && offset < 1) {
                if (gridCord % 2 === 1) {
                    res += lengthCon * offset;
                } else {
                    res += lengthCon * offset;
                }
            }
            return res;
        }


        function calcLenght(startIndex, endIndex) {
            const diff = endIndex - startIndex;
            return ((diff / 2) * con_block_height + (diff / 2 - 1) * mod_block_height) / 2;
        }

    }


    drawSelection(): void  {
        if (this.currentSelection.selModules && this.drawnModules) {
            this.drawnModules.forEach((mod, key) => {
                if (this.currentSelection.selModules.includes(key)) {
                    mod.selectAll('rect').items[0].attr({class: 'module_box active_box'});
                } else {
                    mod.selectAll('rect').items[0].attr({class: 'module_box inactive_box'});
                }
            });
        }

    }


    resetSelection(): void {
        this.userSelection.emit({modules: [], jump: false});
    }

    jumpViewLevel(mod: Module) {
        this.userSelection.emit({modules: [mod.id], jump: true});
    }

    addModuleToSelection(mod: Module): void {
        const newSelection = [...this.currentSelection.selModules, mod.id];
        this.userSelection.emit({modules: newSelection, jump: false});
    }

    removeModuleFromSelection(mod: Module): void {
        const index = this.currentSelection.selModules.indexOf(mod.id);
        const newSelection = [
            ...this.currentSelection.selModules.slice(0, index),
            ...this.currentSelection.selModules.slice(index + 1)
        ];
        this.userSelection.emit({modules: newSelection, jump: false});
    }

    newSelection(mod: Module): void {
        const newSelection = [mod.id];
        this.userSelection.emit({modules: newSelection, jump: false});
    }


}
