import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/employees';
  // private readonly apiUrl = 'http://18.219.13.137:3000/employees';

  getAllEmployees() {
    return this.http.get(this.apiUrl);
  }

  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  update(employeeCode: number, data: any) {
    return this.http.put(`${this.apiUrl}/${employeeCode}`, data);
  }

  delete(employeeCode: number) {
    return this.http.delete(`${this.apiUrl}/${employeeCode}`);
  }
}