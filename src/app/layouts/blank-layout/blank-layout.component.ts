import { Component } from '@angular/core';
import { NavBlankComponent } from '../../components/nav-blank/nav-blank.component.js';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component.js';

@Component({
  selector: 'app-blank-layout',
  imports: [NavBlankComponent , RouterOutlet, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {

}
