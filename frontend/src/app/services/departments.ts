import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private readonly http = inject(HttpClient);
  // private readonly apiUrl = 'http://localhost:3000/departments';
  private readonly apiUrl = 'http://18.219.13.137:3000/departments';

  getAllDepartments() {
    return this.http.get(this.apiUrl);
  }

  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  update(code: number, data: any) {
    return this.http.put(`${this.apiUrl}/${code}`, data);
  }

  delete(code: number) {
    return this.http.delete(`${this.apiUrl}/${code}`);
  }

  getDepartmentWithEmployees(code: number) {
    return this.http.get(`${this.apiUrl}/${code}/employees`);
  }
}
