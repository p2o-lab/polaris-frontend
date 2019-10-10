import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ParameterInterface, ParameterOptions} from '@p2olab/polaris-interface';
import {ParameterChangeDialogComponent} from '../parameter-change-dialog/parameter-change-dialog.component';

@Component({
  selector: 'app-parameter-view',
  templateUrl: './parameter-view.component.html',
  styleUrls: ['./parameter-view.component.css']
})
export class ParameterViewComponent {

  @Input() param: ParameterInterface;
  @Output() changed: EventEmitter<ParameterOptions> = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  changeParameter() {
    const dialogRef = this.dialog.open(ParameterChangeDialogComponent, {
      data: this.param
    });

    dialogRef.afterClosed().subscribe((newParameter: ParameterOptions) => {
      this.changed.emit(newParameter);
    });
  }

}
