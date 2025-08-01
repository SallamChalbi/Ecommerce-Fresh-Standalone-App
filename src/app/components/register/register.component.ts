import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent{
  constructor(private _AuthService:AuthService, private _Router:Router){}

  errMsg: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)]),
    rePassword: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, {validators: [this.confirmPassword]} as FormControlOptions );

  confirmPassword(group: FormGroup):void{
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if(rePassword?.value == '')
      rePassword?.setErrors({required: true});
    else if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({mismatch: true});
    }
  }

  hundleForm(): void{
    this.isLoading = true;
    if(this.registerForm.valid){
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (response)=>{
          if(response.message == "success"){
            this.errMsg = '';
            this.isLoading = false;
            this._Router.navigate(['/login']);
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
