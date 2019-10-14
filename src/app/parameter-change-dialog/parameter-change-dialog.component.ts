import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ParameterInterface, ParameterOptions} from '@p2olab/polaris-interface';

@Component({
  selector: 'app-parameter-change-dialog',
  templateUrl: './parameter-change-dialog.component.html',
  styleUrls: ['./parameter-change-dialog.component.css']
})
export class ParameterChangeDialogComponent {

  public newParamOptions: ParameterOptions;

  constructor(
      public dialogRef: MatDialogRef<ParameterChangeDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public param: ParameterInterface) {
    this.newParamOptions = {
      name: param.name,
      value: param.value
    };
  }

}
