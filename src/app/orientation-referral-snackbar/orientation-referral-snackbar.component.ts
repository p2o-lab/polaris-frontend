import {Component, Inject} from '@angular/core';
import {MatIcon} from '@angular/material';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'orientation-referral-snackbar',
  templateUrl: './orientation-referral-snackbar.component.html',
  styleUrls: ['./orientation-referral-snackbar.component.scss']
})
export class OrientationReferralSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
