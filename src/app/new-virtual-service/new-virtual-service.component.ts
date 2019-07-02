import {Component} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {RecipeService} from '../_services/recipe.service';
import {ServiceParameterDialogComponent} from '../service-parameter-dialog/service-parameter-dialog.component';

@Component({
  selector: 'app-new-virtual-service',
  templateUrl: './new-virtual-service.component.html',
  styleUrls: ['./new-virtual-service.component.css']
})
export class NewVirtualServiceComponent {

    public virtualService: string;

    constructor(private dialogRef: MatDialogRef<ServiceParameterDialogComponent>,
                private backend: RecipeService,
                private snackBar: MatSnackBar) {
    }

    public previewFile(event) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.virtualService = e.target.result.toString();

        };
        reader.readAsText(event.target.files[0]);
    }

    public instantiate() {
        try {
            const virtualService = JSON.parse(this.virtualService);
            console.log(virtualService);
            this.backend.instantiateVirtualService(virtualService).subscribe(
                (data) => {
                    this.dialogRef.close();
                },
                (error) => {
                    this.snackBar.open(error.error.error, 'Dismiss');
                }
            );
        } catch {
            this.snackBar.open('Not valid JSON', 'Dismiss');
        }
    }
}
