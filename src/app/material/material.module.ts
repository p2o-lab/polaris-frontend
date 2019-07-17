import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule, MatBadgeModule, MatButtonModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatDividerModule, MatExpansionModule,
    MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
    MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSnackBarModule,
    MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';

@NgModule({
    imports: [
        MatAutocompleteModule, MatBadgeModule, MatButtonModule,
        MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatDividerModule, MatExpansionModule,
        MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
        MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSnackBarModule,
        MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
    ],
    exports: [
        MatAutocompleteModule, MatBadgeModule, MatButtonModule,
        MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatDividerModule, MatExpansionModule,
        MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
        MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSnackBarModule,
        MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
    ],
})
export class MaterialModule {
}
