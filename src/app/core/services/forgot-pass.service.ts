import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {

  constructor(private _HttpClient:HttpClient) { }

  baseURL: string = 'https://ecommerce.routemisr.com/api/v1/auth/';

  forgotPassword(email: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'forgotPasswords', email );
  }

  restCode(resetCode: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'verifyResetCode', resetCode);
  }

  resetPassword(newPassword: object): Observable<any> {
    return this._HttpClient.put(this.baseURL + 'resetPassword', newPassword);
  }
}
