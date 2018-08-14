import {Component, OnInit} from '@angular/core';
import {BackendService} from '../backend.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent implements OnInit {

  module: string;

  constructor(private backend: BackendService,
              private router: Router) {
  }

  ngOnInit() {
  }

  public previewFile(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.module = e.target.result;
    };
    reader.readAsText(event.target.files[0]);
  }

  addModule() {
    this.backend.addModule(JSON.parse(this.module)).subscribe((data) => {
      this.router.navigate(['/modules']);
    });
  }

  cancel() {
    this.router.navigate(['/modules']);
  }
}
