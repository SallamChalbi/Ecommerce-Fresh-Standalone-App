import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service.js';
import { Category } from '../../core/interfaces/category.js';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [NgFor, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  constructor(private _ProductService:ProductService) {}
  categories: Category[] = [];

  ngOnInit(): void {
    this._ProductService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
}
