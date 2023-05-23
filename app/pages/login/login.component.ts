import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  data : any ; 
  private readonly TOKEN_KEY = 'myapp_token';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email], ],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };
      console.log(data)

      this.auth.loginfn(data).subscribe(
        response => {
          const access_token = response.access;
          const refresh_token = response.refresh;
          if (access_token && refresh_token) {
            this.auth.setAccessToken(access_token);
            this.auth.setRefreshToken(refresh_token);
          }
          this.snackBar.open('Logged in successfully!', 'Close', {
            duration: 2000
          });
          this.router.navigate(['/']);
        },
        error => {
          let errorMessage = 'An error occurred!';
          if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }
          this.snackBar.open(errorMessage, 'Close', {
            duration: 2000,
          });
        }
      );
    }
  }

  onCancel() {
    this.loginForm.reset();
  }

  
}
