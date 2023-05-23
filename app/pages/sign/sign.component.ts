import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  signInForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private auth:AuthService , private router : Router) { }
  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      first_name : ['' ,[Validators.required]],
      last_name: ['' ,[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    console.log(this.signInForm.value)
    if (this.signInForm.valid){
      const  data = {
        first_name : this.signInForm.get('first_name')?.value,
        last_name : this.signInForm.get('last_name')?.value,
        email :this.signInForm.get('email')?.value,
        password :this.signInForm.get('password')?.value
      };
    this.auth.signup(data).subscribe(
      response => {console.log(response); this.router.navigate(['/login'])},
      error => console.log(error)
    );
  }
}
  onCancel(){}
}