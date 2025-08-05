import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  numOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0);
  userInfo: any;

  baseURL: string = 'https://ecommerce.routemisr.com/api/v1';
  

  addToCart(prodId: string): Observable<any>{
    return this._HttpClient.post(this.baseURL + '/cart', 
      {
        productId: prodId
      });
  }

  getCart(): Observable<any> {
    return this._HttpClient.get(this.baseURL + '/cart');
  }

  removeCartItem(prodId: string): Observable<any> {
    return this._HttpClient.delete(this.baseURL + `/cart/${prodId}`);
  }

  updateCartItemQuantity(prodId: string, quantity: number): Observable<any> {
    return this._HttpClient.put(this.baseURL + `/cart/${prodId}`, 
      {
        count: quantity
      });
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(this.baseURL + '/cart');
  }

  checkOut(cartId: string | null, userInfo: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + `/orders/checkout-session/${cartId}?url=https://sallamchalbi-ecommerce-fresh-standa-gamma.vercel.app`, 
      {
        shippingAddress: userInfo
      }
  );
  }

  getAllOrders(): Observable<any> {
    return this._HttpClient.get(this.baseURL + `/orders`);
  }

  decodeToken(): void{
    const encode = localStorage.getItem('token');
    
    if(encode){
      const decode = jwtDecode(encode);
      this.userInfo = decode;
      // console.log(this.userInfo);
    }
  }
}
