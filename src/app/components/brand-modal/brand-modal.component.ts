import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-brand-modal',
  imports: [MatDialogModule],
  templateUrl: './brand-modal.component.html',
  styleUrl: './brand-modal.component.scss'
})
export class BrandModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
}
