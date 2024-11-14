import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private dataUrl = 'data.txt';
  employeesSignal = signal<Employee[]>([]);

  http = inject(HttpClient);

  loadEmployees() {
    this.http.get<Employee[]>(this.dataUrl).subscribe((data) => {
      const updatedData = data.map((employee) => ({
        ...employee,
        valid: /^[aeiouAEIOU]/.test(employee.employee_name)
          ? 'Valid'
          : 'Invalid',
      }));
      this.employeesSignal.set(updatedData);
    });
  }

  getEmployeeById(id: number): Employee | string {
    const employee = this.employeesSignal().find((e) => e.id === id);

    if (!employee) {
      return 'Invalid Employee';
    }

    const nameStartsWithVowel = /^[aeiouAEIOU]/.test(employee.employee_name);
    return nameStartsWithVowel
      ? employee
      : 'Employee’s name does not begin with a vowel';
  }
}
