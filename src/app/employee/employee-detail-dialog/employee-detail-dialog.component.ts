import { CurrencyPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Employee } from '../employee.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-employee-detail-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CurrencyPipe, MatCardModule],
  templateUrl: './employee-detail-dialog.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class EmployeeDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public employee: Employee) {}
}
