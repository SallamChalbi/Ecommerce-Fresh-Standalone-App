import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service.js';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrandModalComponent } from '../brand-modal/brand-modal.component.js';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, NgxPaginationModule, MatDialogModule, MatButtonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  constructor(private _ProductService:ProductService, private _MatDialog:MatDialog) { }

  brands: any[] = [];
  pageSize: number = 10; // Number of brands per page
  page: number = 1; // Current page number
  total: number = 0; // Total number of brands

  ngOnInit(): void {
    this._ProductService.getBrands().subscribe({
      next: (response) => {
        // console.log(response);
        this.brands = response.data;
        this.pageSize = response.metadata.limit;
        this.page = response.metadata.currentPage;
        this.total = response.results;
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
      }
    });
  }

  pageChanged(event: any): void {
    // console.log('Page changed to:', event);
    this._ProductService.getBrands(event).subscribe({
      next: (response) => {
        this.brands = response.data;
        this.pageSize = response.metadata.limit;
        this.page = response.metadata.currentPage;
        this.total = response.results;
        // console.log(this.brands);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openModal(productImage: string, productName: string): void {
    this._MatDialog.open(BrandModalComponent, {
      width: '400px',
      data: {
        image: productImage,
        name: productName,
      }
    });
  }
}
