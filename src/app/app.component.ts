import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fileSizeValidator, fileTypeValidator } from './file.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-upload';

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  fileInputLabel: string;
  allowedFileTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
  ];

  fileUploadForm = this.formBuilder.group({
    myFile: ['', Validators.compose([Validators.required])],
    test: ['sdafasdf'],
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onFileSelect(event): void {
    const files = event.target.files;
    this.myFile.setValidators([
      fileSizeValidator(files, 5),
      fileTypeValidator(files, this.allowedFileTypes),
    ]);

    this.myFile.updateValueAndValidity();
  }

  onFormSubmit(): void {}

  get myFile(): AbstractControl {
    return this.fileUploadForm.get('myFile');
  }
}
