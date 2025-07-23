import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service.js';
import { ProductService } from '../../core/services/product.service.js';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe.js';
import {NgxPaginationModule} from 'ngx-pagination'; 

@Component({
  selector: 'app-products',
  imports: [RouterLink, CommonModule, CuttextPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  constructor(
    private _ProductService:ProductService, 
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2
  ) { }

  products: any[] = [];
  pageSize: number = 10; // Number of products per page
  page: number = 1; // Current page number
  total: number = 0; // Total number of products

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.page = response.metadata.currentPage;
        this.total = response.results;
        // console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addProduct(productId: string, element: HTMLButtonElement): void {
    this._Renderer2.setProperty(element, 'disabled', true);
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        // console.log('Product added to cart:', response);
        this._ToastrService.success(response.message)
        this._Renderer2.removeAttribute(element, 'disabled');

        this._CartService.numOfCartItems.next(response.numOfCartItems);
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this._Renderer2.removeAttribute(element, 'disabled');
      }
    })
  }

  pageChanged(event: any): void {
    // console.log('Page changed to:', event);
    this._ProductService.getProducts(event).subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.page = response.metadata.currentPage;
        this.total = response.results;
        // console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
