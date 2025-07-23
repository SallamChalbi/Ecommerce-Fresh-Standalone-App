import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { NgIf } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{
  constructor(private _Router: Router, private _CartService:CartService) {}

  cartNumber: number = 0;

  ngOnInit(): void {
    this._CartService.numOfCartItems.subscribe({
      next: (data)=>{
        // console.log('Number of cart items:', data);
        this.cartNumber = data;
      },
      error: (err)=>{
        console.error('Error fetching number of cart items:', err);
      }
    })

    this._CartService.getCart().subscribe({
      next: (response)=>{
        this.cartNumber = response.numOfCartItems;
      },
      error: (err)=>{
        console.error('Error fetching cart items:', err);
      }
    })
  }

  signOut(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
}
