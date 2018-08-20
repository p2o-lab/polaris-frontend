import {Component, OnInit} from '@angular/core';
import {BackendService} from '../_services/backend.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-new-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent implements OnInit {

  module: string;
  file: File;

  constructor(private backend: BackendService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  public previewFile(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.module = e.target.result;
    };
    reader.readAsText(event.target.files[0]);
    this.file = event.target.files[0];
  }

  addModule() {
    const formData: FormData = new FormData();

    formData.append('file', this.file);
    this.backend.addModule(formData).subscribe(
      (data) => {
      this.router.navigate(['/modules']);
    },
      (error) => {
        this.snackBar.open(error.toString(), 'Dismiss');
      });
  }

  cancel() {
    this.router.navigate(['/modules']);
  }
}
