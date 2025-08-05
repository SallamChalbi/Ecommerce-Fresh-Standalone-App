import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service.js';
import { CommonModule } from '@angular/common';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe.js';

@Component({
  selector: 'app-allorders',
  imports: [CommonModule, CuttextPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService:CartService) { }

  userOrders: any = [];

  ngOnInit(): void {
    this._CartService.decodeToken();

    this._CartService.getAllOrders().subscribe({
      next: (response) => {
        // console.log('All orders:', response);
        // console.log('User Info:', this._CartService.userInfo);
        this.userOrders = response.data.filter((order: any) => order.user._id === this._CartService.userInfo.id);
        // console.log('Filtered Orders:', this.userOrders);
      },
      error: (error) => {
        console.error('Error fetching all orders:', error);
      }
    });
    
    
  }
}
