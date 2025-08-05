import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  baseURL: string = 'https://ecommerce.routemisr.com/api/v1/';

  getProducts(pageNum: number = 1): Observable<any> {
    return this._HttpClient.get(this.baseURL + `products?page=${pageNum}`);
  }

  getProductDetails(id: string | null): Observable<any> {
    return this._HttpClient.get(this.baseURL + `products/${id}`);
  }

  getCategories(): Observable<any> {
    return this._HttpClient.get(this.baseURL + 'categories');
  }

  getCategoryDetails(id: string | null): Observable<any> {
    return this._HttpClient.get(this.baseURL + `categories/${id}`);
  }

  getSubCategoriesOfCategory(categoryId: string | null): Observable<any> {
    return this._HttpClient.get(this.baseURL + `categories/${categoryId}/subcategories`);
  }

  getBrands(pageNum: number = 1): Observable<any> {
    return this._HttpClient.get(this.baseURL + `brands?page=${pageNum}`);
  }

  getBrandDetails(id: string | null): Observable<any> {
    return this._HttpClient.get(this.baseURL + `brands/${id}`);
  }
}
