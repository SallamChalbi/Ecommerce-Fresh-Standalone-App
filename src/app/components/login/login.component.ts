import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _AuthService:AuthService, private _Router:Router){}

  errMsg: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)]),
  });

  hundleForm(): void{
    this.isLoading = true;
    if(this.loginForm.valid){
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (response)=>{
          if(response.message == "success"){
            this.errMsg = '';
            this.isLoading = false;

            localStorage.setItem('token', response.token);
            this._AuthService.decodeToken();
            this._Router.navigate(['/home']);
          }
        },
        error: (err)=>{
          this.isLoading = false;
          this.errMsg = err.error.message || 'An error occurred during registration. Please try again later.';
        }
      })
    }
  }


}
