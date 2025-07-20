import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  baseURL: string = 'https://ecommerce.routemisr.com/api/v1/';
  Token: any = {
          token: localStorage.getItem('token')
  }

  addToCart(prodId: string): Observable<any>{
    return this._HttpClient.post(this.baseURL + 'cart', 
      {
        productId: prodId
      },
      {
        headers: this.Token
      });
  }
}
