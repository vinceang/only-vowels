import { CurrencyPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { EmployeeDetailDialogComponent } from '../employee-detail-dialog/employee-detail-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { LogoTaglineComponent } from '../../logo-tagline/logo-tagline.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CurrencyPipe,
    MatIconModule,
    MatChipsModule,
    MatSlideToggle,
    FormsModule,
    LogoTaglineComponent,
  ],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  validEmployee = signal<Employee | undefined>(undefined);
  invalidResultMessage = signal<string | undefined>(undefined);

  employees = inject(EmployeeService).employeesSignal;
  searchQuery = signal<string>('');

  dataSource = new MatTableDataSource<Employee>();

  setDataSource = effect(() => {
    this.dataSource.data = this.employees();
  });

  displayedColumns: string[] = [
    'id',
    'employee_name',
    'employee_salary',
    'employee_age',
    'valid',
  ];
  showValidColumn = true;

  @ViewChild('employeeIdInput') employeeIdInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatSort) sort!: MatSort;
  private dialog = inject(MatDialog);
  private employeeService = inject(EmployeeService);

  ngOnInit() {
    this.employeeService.loadEmployees(); // Load employees initially
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  toggleValidColumn(): void {
    if (this.showValidColumn) {
      if (!this.displayedColumns.includes('valid')) {
        this.displayedColumns.push('valid');
      }
    } else {
      this.displayedColumns = this.displayedColumns.filter(
        (column) => column !== 'valid'
      );
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearResultMessage(): void {
    this.validEmployee.set(undefined);
    this.invalidResultMessage.set(undefined);
    this.resetEmployeeIdInput();
  }

  resetEmployeeIdInput(): void {
    if (this.employeeIdInput) {
      this.employeeIdInput.nativeElement.value = '';
    }
  }

  checkEmployeeById(id: number): void {
    // Clear both messages if the ID is empty
    if (!id) {
      this.validEmployee.set(undefined);
      this.invalidResultMessage.set(undefined);
      return;
    }

    // Get the result from the service
    const employee = this.employeeService.getEmployeeById(id);

    // If employee is found and valid, set validEmployee signal
    if (typeof employee === 'object' && employee) {
      this.validEmployee.set(employee);
      this.invalidResultMessage.set(undefined);
    } else {
      // Set invalidResultMessage if no valid employee is found
      this.invalidResultMessage.set(employee as string); // Cast employee to string for error message
      this.validEmployee.set(undefined);
    }
  }

  openEmployeeDetail(employee: Employee): void {
    this.dialog.open(EmployeeDetailDialogComponent, {
      data: employee,
    });
  }
}
