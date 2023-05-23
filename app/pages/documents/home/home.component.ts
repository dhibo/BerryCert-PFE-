import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
token!:any;
documentForm!: FormGroup;
constructor(private fb : FormBuilder , private snackBar : MatSnackBar){}
ngOnInit(): void {
  this.documentForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    description: ['', Validators.required],
    file: ['', Validators.required],
  });
}

addDocument() {
  if (this.documentForm.valid) {
    // Add document logic here
    this.snackBar.open('Document added successfully!', '', {
      duration: 2000,
    });
    this.documentForm.reset();
  }
}
onSubmit(): void {
  console.log(this.documentForm.value);
}
 


}
