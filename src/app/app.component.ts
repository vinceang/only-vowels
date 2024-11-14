import { Component } from '@angular/core';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeListComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
