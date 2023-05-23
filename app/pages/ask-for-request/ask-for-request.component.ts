import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup , Validators , FormBuilder  , } from '@angular/forms';
@Component({
  selector: 'app-ask-for-request',
  templateUrl: './ask-for-request.component.html',
  styleUrls: ['./ask-for-request.component.css']
})
export class AskForRequestComponent {
  requestAccessForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AskForRequestComponent>
  ) {
    this.requestAccessForm = fb.group({
      reason: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['']
    });
  }

  onSubmit() {
    if (this.requestAccessForm.valid) {
      this.dialogRef.close(this.requestAccessForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

