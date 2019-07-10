import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { CurrentSelection } from '../../../../models/current-selection.model';
import { Module } from '../../../../models/module.model';
import { Subplant } from '../../../../models/subplant.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    @Input() currentLevel: number;
    @Input() subplant: Dictionary<Subplant>;
    @Input() modules: Dictionary<Module>;
    @Input() currentSelection: CurrentSelection;
    @Output() stepsBack = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
    }

    private goBack(steps: number) {
        this.stepsBack.emit(steps);
    }

}
