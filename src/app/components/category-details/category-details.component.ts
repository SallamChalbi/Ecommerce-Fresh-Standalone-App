import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service.js';
import { Category } from '../../core/interfaces/category.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-details',
  imports: [CommonModule],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductService:ProductService) {}

  categoryId: string | null = null;
  categoryData: Category = {} as Category;
  subCategories: any[] = [];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params)=> {
        this.categoryId = params.get('id');
        // console.log('Category ID:', this.categoryId);
        }
    })

    this._ProductService.getCategoryDetails(this.categoryId).subscribe({
      next: (response) => {
        // console.log('Category Details:', response.data);
        this.categoryData = response.data;
      },
      error: (err) => {
        console.error('Error fetching category details:', err);
      }
    });

    this._ProductService.getSubCategoriesOfCategory(this.categoryId).subscribe({
      next: (response) => {
        // console.log('Subcategories:', response);
        this.subCategories = response.data;
      },
      error: (err) => {
        console.error('Error fetching subcategories:', err);
      }
    })
  }
}
