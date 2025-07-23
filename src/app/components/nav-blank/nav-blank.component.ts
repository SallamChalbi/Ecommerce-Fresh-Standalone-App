import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  constructor(
    private _Router: Router, 
    private _CartService:CartService,
    private _Renderer2:Renderer2
  ) {}

  @ViewChild('navbar') navbar!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void{
    if (window.scrollY > 400) {
      this._Renderer2.addClass(this.navbar.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navbar.nativeElement, 'shadow');
    }
    else {
      this._Renderer2.removeClass(this.navbar.nativeElement, 'px-5');
      this._Renderer2.removeClass(this.navbar.nativeElement, 'shadow');
    }
  }

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
