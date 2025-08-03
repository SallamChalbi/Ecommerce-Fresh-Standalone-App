import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ForgotPassService } from '../../core/services/forgot-pass.service.js';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  constructor(private _ForgotPassService:ForgotPassService, private _Router:Router) {}

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  isLoading: boolean = false;

  email: string = '';
  msg: string = ''
  errMsg: string = '';

  forgotform: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  ResetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required])
  });

  newPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)])
  });

  forgotPassword(): void{
    if(this.forgotform.valid){
      this.isLoading = true;
      this._ForgotPassService.forgotPassword(this.forgotform.value).subscribe({
        next: (response) => {
          // console.log(response);
          if(response.statusMsg === 'success'){
            this.step1 = false;
            this.step2 = true;
            this.email = this.forgotform.value.email;
            this.errMsg = '';
            this.msg = 'A reset code has been sent to your email.';
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.errMsg = err.error.message || 'An error occurred. Please try again later.';
          this.isLoading = false;
        }
      });
    }
  }

  verifyResetCode(): void {
    if(this.ResetCodeForm.valid){
      this.isLoading = true;
      this._ForgotPassService.restCode(this.ResetCodeForm.value).subscribe({
        next: (response) => {
          // console.log(response);
          if(response.status === 'Success'){
            this.step2 = false;
            this.step3 = true;
            this.errMsg = '';
            this.msg = 'Reset code verified successfully. Please set a new password.';
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.errMsg = err.error.message || 'An error occurred. Please try again later.';
          this.isLoading = false;
        }
      });
    }
  }

  resetPassword(): void{
    if(this.newPasswordForm.valid){
      this.isLoading = true;
      const resetData = {
        email: this.email,
        newPassword: this.newPasswordForm.value.newPassword
      };
      this._ForgotPassService.resetPassword(resetData).subscribe({
        next: (response) => {
          // console.log(response);
          if(response.token){
            this.errMsg = '';
            this.forgotform.reset();
            this.ResetCodeForm.reset();
            this.newPasswordForm.reset();

            localStorage.setItem('token', response.token);
            this._Router.navigate(['/home']);
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.errMsg = err.error.message || 'An error occurred. Please try again later.';
          this.isLoading = false;
        }
      });
    }
  }
}
