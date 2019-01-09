import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {BackendService} from '../_services/backend.service';

@Component({
  selector: 'app-new-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent {

  public module: string;
  public file: File;

  constructor(private backend: BackendService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  public previewFile(event) {
      this.file = event.target.files[0];
      const reader: FileReader = new FileReader();
      reader.onload = (e: Event) => {
        this.module = reader.result;
      };
      reader.readAsText(this.file);
  }

  public addModule() {
    const formData: FormData = new FormData();

    formData.append('file', this.file);
    this.backend.addModule(formData).subscribe(
      (data) => {
        this.router.navigate(['/modules']);
    },
      (error) => {
        this.snackBar.open(error.error.error, 'Dismiss');
      });
  }

  public cancel() {
    this.router.navigate(['/modules']);
  }
}
