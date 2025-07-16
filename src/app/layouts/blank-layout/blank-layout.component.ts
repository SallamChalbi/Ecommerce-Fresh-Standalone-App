import { Component, HostListener } from '@angular/core';
import { NavBlankComponent } from '../../components/nav-blank/nav-blank.component.js';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component.js';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-blank-layout',
  imports: [NavBlankComponent , RouterOutlet, FooterComponent, NgStyle],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {
  constructor() { }

  showArrow: boolean = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.showArrow = window.scrollY > 200;
  }

  goToUp(): void {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
