import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service.js';
import { CurrencyPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { Product } from '../../core/interfaces/product.js';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe.js';
import { Category } from '../../core/interfaces/category.js';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, CurrencyPipe, CuttextPipe, SlicePipe, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private _ProductService:ProductService) { }

  products: Product[] = [];
  categories: Category[] = [];
  
  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        // console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this._ProductService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
         console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: false
  }

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }
}
